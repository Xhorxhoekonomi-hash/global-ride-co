import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  phone?: string
  email?: string
  origin?: string
  destination?: string
  vehicleLink?: string
  model?: string
  service?: string
  message?: string
  source?: string
  locale?: string
  sourcePage?: string
  submittedAt?: string
}

const Row = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <Text style={row}>
      <span style={labelStyle}>{label}: </span>
      {value}
    </Text>
  ) : null

const LeadNotificationEmail = (props: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New enquiry from {props.name ?? 'a visitor'} — {props.origin ?? 'website'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New enquiry — Alpha Worldwide</Heading>
        <Text style={subtle}>
          Submitted via {props.source ?? 'website'}
          {props.sourcePage ? ` on ${props.sourcePage}` : ''}
          {props.locale ? ` (${props.locale === 'sq' ? 'Albanian' : 'English'} page)` : ''}
        </Text>
        <Hr style={hr} />
        <Section>
          <Row label="Name" value={props.name} />
          <Row label="Phone" value={props.phone} />
          <Row label="Email" value={props.email} />
          <Row label="Import from" value={props.origin} />
          <Row label="Destination" value={props.destination} />
          <Row label="Vehicle link / lot" value={props.vehicleLink} />
          <Row label="Make & model" value={props.model} />
          <Row label="Service" value={props.service} />
          <Row label="Message" value={props.message} />
        </Section>
        <Hr style={hr} />
        <Text style={subtle}>
          This enquiry is also stored in your leads list. Reply directly to the customer using the
          contact details above.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: LeadNotificationEmail,
  subject: (data: Record<string, any>) =>
    `New enquiry: ${data.name ?? 'Website visitor'} — ${data.origin ?? 'Alpha Worldwide'}`,
  displayName: 'Owner lead notification',
  to: 'info@alphaworldwidealbania.com',
  previewData: {
    name: 'Test Customer',
    phone: '+355 69 000 0000',
    email: 'customer@example.com',
    origin: 'USA',
    destination: 'Albania',
    model: 'BMW X5',
    service: 'Purchase support',
    message: 'Please send me a quote.',
    source: 'quote-form',
    locale: 'en',
    sourcePage: '/contact',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 25px', maxWidth: '560px' }
const heading = { color: '#003C5A', fontSize: '22px', margin: '0 0 8px' }
const subtle = { color: '#5B6B76', fontSize: '13px', lineHeight: '1.5' }
const hr = { borderColor: '#E5E7EB', margin: '16px 0' }
const row = { color: '#003C5A', fontSize: '15px', lineHeight: '1.6', margin: '4px 0' }
const labelStyle = { color: '#0F8796', fontWeight: 600 as const }
