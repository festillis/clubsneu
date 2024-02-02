import { Stack, Typography } from '@suid/material';
import { Component, Show } from 'solid-js';
import {
  AiOutlineMail,
  AiOutlineLinkedin,
  AiOutlineInstagram,
  AiOutlineGithub
} from 'solid-icons/ai';
import { FaBrandsMeta, FaBrandsDiscord } from 'solid-icons/fa';
import { CgWebsite } from 'solid-icons/cg';
import { colors } from '~/constants';
import ContactRow from './ContactRow';

interface Props {
  email?: string;
  websiteUrl?: string | null;
  linkedinUrl?: string | null;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  githubUrl?: string | null;
  discordUrl?: string | null;
}

const ClubContact: Component<Props> = ({
  email,
  websiteUrl,
  linkedinUrl,
  instagramUrl,
  facebookUrl,
  githubUrl,
  discordUrl
}) => {
  return (
    <Stack
      direction="column"
      sx={{
        gap: '1rem',
        borderRadius: '0.75rem',
        backgroundColor: '#FFFFFF',
        padding: '2rem',
        boxShadow: colors.BOX_SHADOW
      }}>
      <Typography variant="h3">Contact</Typography>
      <Show
        when={
          !email &&
          !websiteUrl &&
          !linkedinUrl &&
          !instagramUrl &&
          !facebookUrl &&
          !githubUrl &&
          !discordUrl
        }>
        <Typography variant="body1" color="text.secondary">
          No contact information available.
        </Typography>
      </Show>
      <Show when={email}>
        <ContactRow
          icon={<AiOutlineMail size="1.5rem" />}
          label="Email"
          href={`mailto:${email!}`}
        />
      </Show>
      <Show when={websiteUrl}>
        <ContactRow
          icon={<CgWebsite size="1.5rem" />}
          label="Website"
          href={websiteUrl!}
        />
      </Show>
      <Show when={linkedinUrl}>
        <ContactRow
          icon={<AiOutlineLinkedin size="1.5rem" />}
          label="LinkedIn"
          href={linkedinUrl!}
        />
      </Show>
      <Show when={instagramUrl}>
        <ContactRow
          icon={<AiOutlineInstagram size="1.5rem" />}
          label="Instagram"
          href={instagramUrl!}
        />
      </Show>
      <Show when={facebookUrl}>
        <ContactRow
          icon={<FaBrandsMeta size="1.5rem" />}
          label="Meta"
          href={facebookUrl!}
        />
      </Show>
      <Show when={githubUrl}>
        <ContactRow
          icon={<AiOutlineGithub size="1.5rem" />}
          label="GitHub"
          href={githubUrl!}
        />
      </Show>
      <Show when={discordUrl}>
        <ContactRow
          icon={<FaBrandsDiscord size="1.5rem" />}
          label="Discord"
          href={discordUrl!}
        />
      </Show>
    </Stack>
  );
};

export default ClubContact;
