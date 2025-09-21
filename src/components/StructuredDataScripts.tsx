'use client';

import { PersonSchema, WebSiteSchema, OrganizationSchema } from './StructuredData';

export default function StructuredDataScripts() {
  return (
    <>
      <PersonSchema />
      <WebSiteSchema />
      <OrganizationSchema />
    </>
  );
}
