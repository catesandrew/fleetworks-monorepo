<!--
PUBLIC blog post draft. ⚠ SANITIZED already but re-check before publishing:
  - Domain names, account names, and zone IDs below have been generalized/removed.
  - Ask the user before publishing anywhere.
  Keep it a story about the PROBLEM and the TECHNIQUE, not the proprietary system.
-->

# The AI video hero had a letterbox baked in, and other things I learned building a scroll-driven pitch site in one afternoon

*A cinematic scroll site, real product screenshots as proof instead of mockups, and three infrastructure assumptions that turned out to be wrong.*

## The problem

I needed a pitch site for an internal call, fast: a suite of five internal
tools, one governance story tying them together, and a stakeholder audience
that would trust real screenshots more than polished mockups. No CMS, no
build step, just a page that scrolls like a short film and then settles into
a real site with real proof.

The interesting part wasn't the copywriting. It was three assumptions that
turned out to be wrong, each one caught by checking instead of assuming.

## What I tried

The hero is a single AI-generated 6-second clip, scrubbed by scroll position
instead of played on a timer, the classic "video as a canvas the visitor
paints with their scroll wheel" technique. The mechanism is a `position:
sticky` stage inside a tall (600vh) section: compute scroll progress as a
0–1 fraction, map it to the video's `currentTime`, and lerp toward that
target in a `requestAnimationFrame` loop so seeks stay smooth instead of
jumping.

```js
function tick() {
  if (ready && !seeking) {
    const delta = targetTime - displayedTime;
    if (Math.abs(delta) > 0.008) {
      displayedTime += delta * 0.35; // lerp, don't snap
      seeking = true;
      video.currentTime = displayedTime;
    }
  }
  requestAnimationFrame(tick);
}
```

That part worked first try. What didn't:

**The generated frame had a letterbox baked into the actual pixels.** It
looked fine in the preview widget. Full-bleed in a real hero, there were
~130px black bars top and bottom that weren't a CSS or aspect-ratio problem,
they were literally rendered into the image. `object-fit: cover` can't fix
content that's already inside the frame. The fix was extracting a still,
looking at it at real display size, and cropping the bars out with ffmpeg
before the final encode. Lesson: never trust a generated hero asset's edges
without inspecting a real frame at real size first.

**Small generated icons need a tight crop before you shrink them.** A set of
small accent badges came back as 1024×1024 images with a tiny centered glyph
and a huge white margin, the kind of generous padding an "icon" prompt
naturally produces. Downscaled to their actual 22px display size, the glyphs
vanished into a nearly invisible dot. Crop tight to the subject first, *then*
resize down, not the other way around.

**A later architecture diagram needed to reveal itself as you scrolled, one
node at a time.** That part was simpler than expected: five stacked text
"steps" next to a sticky SVG, one `IntersectionObserver` watching which step
is centered, and a class toggle that reveals every diagram element up
through that step's number. `stroke-dashoffset` draws the connecting lines
in, `opacity` + `transform: scale()` pops the nodes in. Reversible for free,
since scrolling back up just un-reveals later steps as they leave view. No
animation library needed for this one.

## What I learned

The technique lessons were expected. The infrastructure lessons were the
bigger surprise, and they were both about checking before assuming:

- I assumed adding a new subdomain would need either a manual DNS console
  walkthrough or a fresh API connector setup. It needed neither: the
  environment already had working API credentials for the DNS provider sitting
  in the shell, left over from other work. `env | grep` before assuming a
  manual setup step is required.
- I assumed that new subdomain would need a fresh DNS record pointing at the
  hosting provider. It didn't: the domain already had a wildcard record
  covering every subdomain, a leftover from how the other apps in the suite
  were set up. Attaching the domain to the new deployment target verified as
  correctly configured instantly, zero DNS changes made. Check the existing
  zone before adding a record.
- A background research agent, told exactly what to do, at one point returned
  something completely unrelated to its assignment (fragments of a *different*
  step's instructions). Re-running the same task as a fresh, self-contained
  agent fixed it immediately. If a subagent's output doesn't match its
  assignment, the fix is usually a clean retry with a fully self-contained
  prompt, not more debugging of the first attempt.

## Takeaways

- Inspect generated media at its *actual display size* before building
  around it, edges and small-scale legibility both hide problems that don't
  show up in a preview widget.
- Before doing infrastructure work by hand, check what credentials and DNS
  records already exist. Someone (possibly you, in an earlier session) may
  have already done the hard part.
- Scroll-driven reveals (video scrub, diagram build-out) don't need an
  animation library if the state machine is simple: compute progress,
  toggle classes, let CSS transitions do the actual animating.

---

<!-- Suggested tags: web-dev, ai-generated-media, scroll-animation, devops · Est. reading time: 5 min · Cross-post targets: personal blog, dev.to -->
