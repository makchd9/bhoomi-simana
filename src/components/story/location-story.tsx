"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { address, connectivity } from "@/data/buyer-content";
import { location } from "@/data/location";
import { media } from "@/data/source-media";
import { EditorialImage } from "@/components/media/editorial-image";
export function LocationStory() {
  const [showMap, setShowMap] = useState(false);
  return (
    <section
      id="location"
      className="location-section story-section"
      data-nav-theme="dark"
      aria-labelledby="location-title"
    >
      <div className="page-gutter">
        <div className="section-line">
          <span className="eyebrow">The neighbourhood</span>
          <span className="eyebrow">Lalbaug, Mumbai</span>
        </div>
        <div className="section-heading">
          <h2 id="location-title" tabIndex={-1}>
            A city <em>within reach.</em>
          </h2>
          <div>
            <p>{location.sourceDescription}</p>
            <a
              className="action-link"
              href={location.directions}
              target="_blank"
              rel="noreferrer"
            >
              Get directions <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
      <EditorialImage
        asset={media.view}
        label="View from Simāna"
        aspectRatio="2 / 1"
        sizes="100vw"
        parallax
        className="location-panorama"
      />
      <div className="connectivity page-gutter">
        <span className="eyebrow">Around the address</span>
        <ul>
          {connectivity.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <p className="fine-print">
          Destinations and connections referenced in project material; no travel
          times or distances are implied. Routes and access conditions vary.
        </p>
        <Link href="/contact?type=Book%20Site%20Visit" className="action-link">
          Book a site visit ↗
        </Link>
      </div>
      <div className="location-map page-gutter">
        <div>
          <span className="eyebrow">Find your way home</span>
          <h3>
            Lalbaug.
            <br />
            <em>At the heart of it.</em>
          </h3>
          <address>
            {address.name}
            <br />
            {address.street}
            <br />
            {address.locality}
            <br />
            {address.city}, {address.region} {address.postalCode}
            <br />
            {address.country}
          </address>
          <a
            className="action-link"
            href={location.directions}
            target="_blank"
            rel="noreferrer"
          >
            Open in Google Maps <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="map-frame">
          {showMap ? (
            <iframe
              title="Simāna by Bhoomi location on Google Maps"
              src={location.mapEmbed}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <button className="map-load" onClick={() => setShowMap(true)}>
              <MapPin size={28} strokeWidth={1} />
              <span>Simāna — The Urban Oasis</span>
              <span className="action-link">
                Load location map <ArrowUpRight size={15} />
              </span>
              <small>Loads Google Maps when selected.</small>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
