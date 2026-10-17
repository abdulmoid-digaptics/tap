"use client";

import { useId, useRef, type ReactNode } from "react";
import { ArrowRight, Close } from "./icons";
import styles from "./ProductDetails.module.css";

/** "View details" button that opens a native modal dialog with server-rendered content. */
export function ProductDetails({
  title,
  children,
  stretch = false,
}: {
  title: string;
  children: ReactNode;
  /** Let the button's hit area cover its whole card, so the entire tile opens the details. */
  stretch?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  return (
    <>
      <button
        type="button"
        className={`text-link ${stretch ? "stretched-link" : ""}`}
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
      >
        <span>View details</span>
        <ArrowRight />
        <span className="sr-only"> for {title}</span>
      </button>
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby={titleId}
        onClick={(event) => {
          // Close when the backdrop (the dialog element itself) is clicked.
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className={styles.inner}>
          <div className={styles.head}>
            <h3 id={titleId} className={styles.title}>
              {title}
            </h3>
            <button
              type="button"
              className={styles.close}
              onClick={() => dialogRef.current?.close()}
            >
              <Close />
              <span className="sr-only">Close details</span>
            </button>
          </div>
          <div className={styles.body}>{children}</div>
        </div>
      </dialog>
    </>
  );
}

/** A link inside the dialog that closes it before navigating to an on-page anchor. */
export function DialogLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        event.currentTarget.closest("dialog")?.close();
      }}
    >
      {children}
    </a>
  );
}
