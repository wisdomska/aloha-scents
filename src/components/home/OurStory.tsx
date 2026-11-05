import { IMG, photo } from "@/content/images";
export function OurStory() {
  const storyImg = photo(IMG.story);

  return (
    <>
      <section
        id="story"
        aria-labelledby="story-title"
        style={{ background: "#FBF7F2", padding: "clamp(48px,6vw,96px) clamp(20px,4vw,48px) clamp(64px,8vw,120px)" }}
      >
        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap-reverse",
            alignItems: "center",
            gap: "clamp(40px,6vw,96px)",
          }}
        >
          <div data-reveal="" style={{ flex: "1 1 300px", minWidth: "0", display: "flex", justifyContent: "center" }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "min(400px, 84vw)",
                padding: "clamp(12px,2vw,18px)",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: "0",
                  border: "1px solid #C99A5B",
                  borderRadius: "9999px 9999px 0 0",
                }}
              />{" "}
              <div
                role="img"
                aria-label="Hands tying a ribbon around a wrapped gift"
                style={{
                  position: "relative",
                  aspectRatio: "4/5",
                  borderRadius: "9999px 9999px 0 0",
                  overflow: "hidden",
                  background: storyImg,
                }}
              />
            </div>
          </div>{" "}
          <div style={{ flex: "1 1 440px", minWidth: "0", maxWidth: "620px" }}>
            <p
              data-reveal=""
              style={{
                margin: "0",
                font: "600 12px/1.2 var(--font-body)",
                letterSpacing: ".3em",
                textTransform: "uppercase",
                color: "#6B3F35",
              }}
            >
              Our story
            </p>{" "}
            <h2
              id="story-title"
              data-reveal=""
              data-d="60"
              style={{
                margin: "16px 0 0",
                font: "300 clamp(32px,2.6vw + 14px,52px)/1.12 var(--font-display)",
                color: "#2E1A16",
                textWrap: "balance",
                letterSpacing: "-.05em",
              }}
            >
              Aloha means love. It means hello, and goodbye.{" "}
              <em style={{ fontStyle: "italic", color: "#B4695A" }}>Every bottle we send carries all three.</em>
            </h2>{" "}
            <p
              data-reveal=""
              data-d="120"
              style={{
                margin: "22px 0 0",
                font: "400 clamp(16px,.4vw + 14.5px,18px)/1.6 var(--font-body)",
                color: "#6B3F35",
                textWrap: "pretty",
              }}
            >
              A fragrance is never just a fragrance. It&apos;s a memory, a mood, a quiet way of saying “I thought of
              you.” We bring perfumes from Dubai and from houses around the world to Ghana, and match every person to a
              scent that fits their budget, their vibe, or the perfume they&apos;ve been dreaming of.
            </p>{" "}
            <div
              data-reveal=""
              data-d="180"
              style={{
                marginTop: "30px",
                padding: "24px 26px",
                background: "#E7C3B5",
                borderRadius: "22px",
                display: "flex",
                gap: "16px",
                alignItems: "flex-start",
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                aria-hidden="true"
                style={{ flex: "none", marginTop: "4px" }}
              >
                <path
                  fill="#6B3F35"
                  d="M12 0C12.6 7.2 16.8 11.4 24 12C16.8 12.6 12.6 16.8 12 24C11.4 16.8 7.2 12.6 0 12C7.2 11.4 11.4 7.2 12 0Z"
                />
              </svg>{" "}
              <div>
                <p style={{ margin: "0", font: "500 26px/1.2 var(--font-display)", color: "#2E1A16" }}>
                  5% of every bottle feeds a child.
                </p>{" "}
                <p style={{ margin: "8px 0 0", font: "400 16px/1.6 var(--font-body)", color: "#2E1A16" }}>
                  From every bottle we sell, 5% goes to feeding children on the street. Wear Aloha, and you carry a
                  little hope too.
                </p>
              </div>
            </div>{" "}
            <p
              data-reveal=""
              data-d="240"
              style={{ margin: "26px 0 0", font: "400 38px/1 var(--font-script)", color: "#6B3F35" }}
            >
              with love, Aloha
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
