import { project } from "@/data/project";

export function TowerOverview() {
  return <section id="project" className="tower-overview page-gutter" data-nav-theme="dark" aria-labelledby="project-title">
    <div className="overview-intro">
      <span className="eyebrow">Simāna / The Urban Oasis</span>
      <h2 id="project-title" tabIndex={-1}>A new perspective.<br/><em>A place of your own.</em></h2>
      <p>{project.copy.introductionBody}</p>
      <a className="action-link" href="#clubhouse">Inside Aikyam <span aria-hidden="true">↗</span></a>
    </div>
    <dl className="overview-facts">
      <div><dt>The address</dt><dd>Lalbaug, Mumbai</dd></div>
      <div><dt>The main tower</dt><dd>Purnata · 58 floors</dd></div>
      <div><dt>The developer</dt><dd>Bhoomi Properties</dd></div>
    </dl>
    <div id="residences" className="residence-invitation">
      <span className="eyebrow">Your residence</span>
      <h3 tabIndex={-1}>Find your <em>place above it all.</em></h3>
      <p>For layouts, available residences and a personal introduction to the tower, speak with our team.</p>
      <a className="action-link" href="#contact">Request residence details <span aria-hidden="true">↗</span></a>
      <small>Tower-specific plans and availability are awaiting confirmation.</small>
    </div>
  </section>;
}
