import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "EcoGrow Learning",
  description: "LMS ekologis untuk misi belajar lingkungan sekolah dasar.",
  icons: {
    icon: [{ url: "/assets/images/ecogrow-official-favicon.png", type: "image/png" }],
    apple: [{ url: "/assets/images/ecogrow-official-favicon.png", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const extensionAttributeCleaner = `
(function () {
  var blocked = [/^bis_/i, /^__processed_/i];
  function isBlocked(name) {
    return blocked.some(function (pattern) {
      return pattern.test(name || "");
    });
  }
  function scrubElement(element) {
    if (!element || !element.attributes) return;
    Array.prototype.slice.call(element.attributes).forEach(function (attribute) {
      if (isBlocked(attribute.name)) {
        element.removeAttribute(attribute.name);
      }
    });
  }
  function scrubTree(root) {
    if (!root) return;
    if (root.nodeType === 1) {
      scrubElement(root);
    }
    if (root.querySelectorAll) {
      root.querySelectorAll("*").forEach(scrubElement);
    }
  }
  scrubTree(document.documentElement);
  var scheduled = false;
  var observer = new MutationObserver(function (mutations) {
    var needsTreeScrub = false;
    mutations.forEach(function (mutation) {
      if (mutation.type === "attributes" && isBlocked(mutation.attributeName)) {
        scrubElement(mutation.target);
      }
      if (mutation.type === "childList" && mutation.addedNodes.length) {
        needsTreeScrub = true;
      }
    });
    if (needsTreeScrub && !scheduled) {
      scheduled = true;
      requestAnimationFrame(function () {
        scheduled = false;
        scrubTree(document.documentElement);
      });
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    childList: true,
    subtree: true
  });
  window.addEventListener("load", function () {
    window.setTimeout(function () {
      observer.disconnect();
      scrubTree(document.documentElement);
    }, 8000);
  });
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Script
          id="extension-attribute-cleaner"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: extensionAttributeCleaner }}
        />
        {children}
      </body>
    </html>
  );
}
