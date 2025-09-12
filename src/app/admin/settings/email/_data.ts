//src/app/admin/settings/email/_data.ts
export type EmailProvider = {
  id: string;
  name: string;
  region: string;
  status: "Active" | "Inactive";
  priority: number;
  logo?: string;
};

export const EMAIL_PROVIDERS: EmailProvider[] = [
  { id: "sendgrid",  name: "SendGrid",     region: "US",       status: "Active",   priority: 5, logo: "/logo.svg" },
  { id: "mailgun",   name: "Mailgun",      region: "EU",       status: "Inactive", priority: 4, logo: "/logo.svg" },
  { id: "ses",       name: "Amazon SES",   region: "US-East",  status: "Active",   priority: 4, logo: "/logo.svg" },
  { id: "postmark",  name: "Postmark",     region: "Global",   status: "Active",   priority: 3, logo: "/logo.svg" },
  { id: "smtp",      name: "Generic SMTP", region: "Global",   status: "Active",   priority: 2, logo: "/logo.svg" },
];
