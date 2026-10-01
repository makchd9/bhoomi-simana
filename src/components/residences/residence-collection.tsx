"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Expand } from "lucide-react";
import { PurnataIntroduction } from "@/components/buyer/sections";
import { residences } from "@/data/residences";
import { Modal } from "@/components/ui/modal";

export function ResidenceCollection() {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const residence = residences[selected];
  return (
    <section
      id="residences"
      className="collection page-gutter story-section"
      data-nav-theme="dark"
      aria-labelledby="residences-title"
    >
      <div className="section-line">
        <span className="eyebrow">
          The residences / Published plan collection
        </span>
        <span className="eyebrow">2 — 5 BHK</span>
      </div>
      <div className="section-heading">
        <h2 id="residences-title" tabIndex={-1}>
          Space for <em>your life.</em>
        </h2>
        <p>
          Consider the possibilities. Explore the published residence plans,
          from the considered Premium to the expansive Supreme.
        </p>
      </div>
      <PurnataIntroduction />
      <p className="plan-context">
        Project-wide reference layouts from the Simāna website. These are not a
        live inventory of Purnata residences. Type A and Type B refer to the two
        published 3 BHK plans.
      </p>
      <div className="residence-tabs" aria-label="Choose a residence plan">
        {residences.map((item, index) => (
          <button
            key={item.id}
            aria-pressed={index === selected}
            onClick={() => setSelected(index)}
          >
            <span>{item.configuration}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </div>
      <div className="residence-layout">
        <button
          className="plan-preview"
          onClick={() => setExpanded(true)}
          aria-label={`Enlarge ${residence.configuration} ${residence.name} floor plan`}
        >
          <Image
            key={residence.id}
            src={residence.plan}
            alt={`Published ${residence.configuration} ${residence.name} floor plan`}
            width={1536}
            height={1090}
            unoptimized
            sizes="(max-width: 767px) 100vw, 60vw"
          />
          <span className="plan-enlarge">
            <Expand size={15} /> Explore the floor plan
          </span>
        </button>
        <div className="residence-detail" aria-live="polite" aria-atomic="true">
          <span className="eyebrow">{residence.configuration} residence</span>
          <h3>{residence.name}</h3>
          <p>{residence.note}</p>
          <dl>
            <div>
              <dt>Carpet area</dt>
              <dd>
                {residence.area.toLocaleString("en-IN")}{" "}
                <small>sq ft{residence.onwards ? " onwards" : ""}</small>
              </dd>
            </div>
            <div>
              <dt>Flat numbers on plan</dt>
              <dd>{residence.planNumbers}</dd>
            </div>
          </dl>
          <p className="fine-print">
            Published layout for reference. Wing, floor, orientation and current
            availability are confirmed by the sales team.
          </p>
          <div className="inline-actions plan-actions">
            <button className="action-link" onClick={() => setExpanded(true)}>
              View floor plan <Expand size={15} />
            </button>
            <a className="action-link" href={residence.plan} download>
              Download floor plan ↓
            </a>
          </div>
          <a
            className="action-link"
            href={`/contact?configuration=${encodeURIComponent(residence.configuration)}&type=Request%20Floor%20Plan#enquiry-form`}
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("residence:enquire", {
                  detail: residence.configuration,
                }),
              )
            }
          >
            Enquire about this residence <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
      <p className="fine-print">
        Plans are indicative and subject to approval. Areas and flat labels
        above are transcribed from the published drawings. Please verify the
        applicable plan and specifications before purchase.
      </p>
      {expanded && (
        <Modal
          title={`${residence.configuration} ${residence.name} — published floor plan`}
          onClose={() => setExpanded(false)}
        >
          <div className="full-plan">
            <Image
              src={residence.plan}
              alt={`Enlarged ${residence.configuration} ${residence.name} plan`}
              width={1536}
              height={1090}
              unoptimized
              sizes="95vw"
            />
            <a className="action-link" href={residence.plan} download>
              Download published plan <ArrowUpRight size={15} />
            </a>
            <a
              className="action-link"
              href={residence.plan}
              target="_blank"
              rel="noreferrer"
            >
              Open original in full screen ↗
            </a>
            <p className="fine-print">
              Pinch to zoom on a touch device. Download the original for a
              closer look.
            </p>
          </div>
        </Modal>
      )}
    </section>
  );
}
