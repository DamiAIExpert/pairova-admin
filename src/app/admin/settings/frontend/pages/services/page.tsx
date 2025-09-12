"use client";

import React from "react";
import Image from "next/image";
import { Plus, Trash2, Upload, Link as LinkIcon } from "lucide-react";

/* ------------------------------ tiny helpers ------------------------------ */

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-1 text-sm font-medium text-gray-900">{children}</div>;
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 ${props.className ?? ""}`}
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`min-h-[88px] w-full resize-y rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 ${props.className ?? ""}`}
    />
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white">
      <header className="flex items-center justify-between border-b px-4 py-3 sm:px-6">
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      </header>
      <div className="p-4 sm:p-6">{children}</div>
    </section>
  );
}

function UploadPreview({
  label,
  value,
  onChange,
  onReset,
  size = 64,
  round = true,
}: {
  label: string;
  value: string;
  onChange: (dataUrl: string) => void;
  onReset: () => void;
  size?: number;
  round?: boolean;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
      <div
        className={`overflow-hidden ${round ? "rounded-full" : "rounded-lg"} bg-white ring-1 ring-gray-200`}
        style={{ width: size, height: size }}
      >
        <Image src={value} alt={label} width={size} height={size} className="object-cover" />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
        >
          <Upload className="h-4 w-4" />
          Upload {label}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
        >
          <Trash2 className="h-4 w-4" />
          Remove
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            const r = new FileReader();
            r.onload = () => onChange(String(r.result));
            r.readAsDataURL(f);
          }}
        />
      </div>
    </div>
  );
}

/* --------------------------------- types --------------------------------- */

type ServiceCard = {
  id: string;
  title: string;
  description: string;
  image: string; // banner image for the card
  icon: string; // small circle icon
};

type FooterLink = { label: string; href: string };
type FooterGroup = { title: string; links: FooterLink[] };

/* ------------------------------- page state ------------------------------- */

export default function ServicesSettingsPage() {
  // HERO
  const [hero, setHero] = React.useState({
    title: "Services",
    tagline: "Connecting Purpose with Talent – Seamlessly",
    description:
      "Our platform is built to bridge the gap between job seekers and non-profit organizations, using cutting-edge technology and intuitive design to deliver real, impactful results. Here’s what we provide:",
    cta: "Get started",
  });

  // SERVICE CARDS
  const [cards, setCards] = React.useState<ServiceCard[]>([
    {
      id: "svc-1",
      title: "Non Profit",
      description:
        "Non-profit organizations play a vital role in building stronger communities, driving social impact, and addressing the world’s most pressing challenges",
      image:
        "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1200&auto=format&fit=crop",
      icon: "/logo.svg",
    },
    {
      id: "svc-2",
      title: "Job Seekers",
      description:
        "Are you ready to take the next step in your career or start making an impact through meaningful work? Our platform empowers job seekers like you to connect with non-profit organizations that value.",
      image:
        "https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=1200&auto=format&fit=crop",
      icon: "/logo.svg",
    },
    {
      id: "svc-3",
      title: "AI Model",
      description:
        "Our intelligent algorithm analyzes user profiles, skills, and preferences to deliver personalized job recommendations for seekers. With explainable AI, every match comes with transparent reasoning.",
      image:
        "https://images.unsplash.com/photo-1686191128892-fa3d0ce27441?q=80&w=1200&auto=format&fit=crop",
      icon: "/logo.svg",
    },
  ]);

  // COMMUNICATION SECTION
  const [comm, setComm] = React.useState({
    title: "Communicate effectively with our recruiters",
    description:
      "Send and receive messages directly through the platform to streamline interaction between job seekers and non-profit employers.",
    image:
      "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?q=80&w=1200&auto=format&fit=crop",
  });

  // FOOTER
  const [footerLogo, setFooterLogo] = React.useState("/logo.svg");
  const [contact, setContact] = React.useState({
    address: "Boston street Number 10,\nSton villa, Lagos",
    email: "arjndhksa@gmail.com",
    phone: "+234-0183774832----",
  });

  const [groups, setGroups] = React.useState<FooterGroup[]>([
    {
      title: "Company",
      links: [
        { label: "Home", href: "/" },
        { label: "Service", href: "/services" },
        { label: "Project", href: "/projects" },
        { label: "About us", href: "/about" },
      ],
    },
    {
      title: "Information",
      links: [
        { label: "Careers", href: "/careers" },
        { label: "Help Center", href: "/help-center" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Term and Conditions", href: "/terms" },
      ],
    },
  ]);

  const [newsletter, setNewsletter] = React.useState({
    placeholder: "Email address",
    button: "Send",
  });

  const [sponsors, setSponsors] = React.useState<string[]>([
    "https://images.unsplash.com/photo-1617727553252-65863f2c6bda?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=300&auto=format&fit=crop",
  ]);

  /* ------------------------------ handlers ------------------------------ */

  const addCard = () =>
    setCards((s) => [
      ...s,
      {
        id: crypto.randomUUID(),
        title: "",
        description: "",
        image: "https://placehold.co/1200x800/png",
        icon: "/logo.svg",
      },
    ]);

  const updateCard = (id: string, patch: Partial<ServiceCard>) =>
    setCards((s) => s.map((c) => (c.id === id ? { ...c, ...patch } : c)));

  const removeCard = (id: string) => setCards((s) => s.filter((c) => c.id !== id));

  const addGroup = () =>
    setGroups((s) => [...s, { title: "Links", links: [{ label: "", href: "" }] }]);

  const updateGroupTitle = (idx: number, v: string) =>
    setGroups((s) => s.map((g, i) => (i === idx ? { ...g, title: v } : g)));

  const addLinkToGroup = (gidx: number) =>
    setGroups((s) =>
      s.map((g, i) => (i === gidx ? { ...g, links: [...g.links, { label: "", href: "" }] } : g))
    );

  const updateLink = (gidx: number, lidx: number, patch: Partial<FooterLink>) =>
    setGroups((s) =>
      s.map((g, i) =>
        i === gidx
          ? { ...g, links: g.links.map((l, j) => (j === lidx ? { ...l, ...patch } : l)) }
          : g
      )
    );

  const removeLinkFromGroup = (gidx: number, lidx: number) =>
    setGroups((s) =>
      s.map((g, i) =>
        i === gidx ? { ...g, links: g.links.filter((_, j) => j !== lidx) } : g
      )
    );

  const removeGroup = (idx: number) => setGroups((s) => s.filter((_, i) => i !== idx));

  const addSponsor = () => setSponsors((s) => [...s, "/logo.svg"]);
  const updateSponsor = (idx: number, val: string) =>
    setSponsors((s) => s.map((x, i) => (i === idx ? val : x)));
  const removeSponsor = (idx: number) =>
    setSponsors((s) => s.filter((_, i) => i !== idx));

  const handleSave = () => {
    // Swap with your API call later
    console.log("Saving Services Page", {
      hero,
      cards,
      comm,
      footerLogo,
      contact,
      groups,
      newsletter,
      sponsors,
    });
    alert("Saved (mock). Connect to your backend later.");
  };

  /* --------------------------------- UI --------------------------------- */

  return (
    <div className="mx-auto max-w-[1100px] px-6 pb-16">
      <h1 className="mb-6 text-xl font-semibold text-gray-900">Frontend → Services</h1>

      {/* HERO */}
      <Card title="Hero Section">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <FieldLabel>Title</FieldLabel>
            <TextInput value={hero.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} />
          </div>
          <div>
            <FieldLabel>Tagline</FieldLabel>
            <TextInput value={hero.tagline} onChange={(e) => setHero({ ...hero, tagline: e.target.value })} />
          </div>
          <div className="md:col-span-2">
            <FieldLabel>Description</FieldLabel>
            <TextArea
              value={hero.description}
              onChange={(e) => setHero({ ...hero, description: e.target.value })}
            />
          </div>
          <div className="md:col-span-1">
            <FieldLabel>Primary CTA</FieldLabel>
            <TextInput value={hero.cta} onChange={(e) => setHero({ ...hero, cta: e.target.value })} />
          </div>
        </div>
      </Card>

      {/* SERVICE CARDS */}
      <div className="mt-6">
        <Card title="Service Cards">
          <div className="space-y-6">
            {cards.map((c, i) => (
              <div key={c.id} className="rounded-xl border border-gray-200 p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm font-semibold text-gray-900">Card {i + 1}</div>
                  <button
                    type="button"
                    onClick={() => removeCard(c.id)}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-800 hover:bg-gray-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>

                <div className="grid gap-5 md:grid-cols-[180px_1fr]">
                  {/* Image & icon */}
                  <div className="space-y-4">
                    <div>
                      <FieldLabel>Banner Image</FieldLabel>
                      <UploadPreview
                        label="Image"
                        value={c.image}
                        onChange={(v) => updateCard(c.id, { image: v })}
                        onReset={() => updateCard(c.id, { image: "https://placehold.co/1200x800/png" })}
                        size={180}
                        round={false}
                      />
                    </div>
                    <div>
                      <FieldLabel>Small Icon</FieldLabel>
                      <UploadPreview
                        label="Icon"
                        value={c.icon}
                        onChange={(v) => updateCard(c.id, { icon: v })}
                        onReset={() => updateCard(c.id, { icon: "/logo.svg" })}
                        size={44}
                        round
                      />
                    </div>
                  </div>

                  {/* Texts */}
                  <div className="grid gap-4">
                    <div>
                      <FieldLabel>Title</FieldLabel>
                      <TextInput value={c.title} onChange={(e) => updateCard(c.id, { title: e.target.value })} />
                    </div>
                    <div>
                      <FieldLabel>Description</FieldLabel>
                      <TextArea
                        value={c.description}
                        onChange={(e) => updateCard(c.id, { description: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addCard}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
            >
              <Plus className="h-4 w-4" />
              Add card
            </button>
          </div>
        </Card>
      </div>

      {/* COMMUNICATION / QUOTE */}
      <div className="mt-6">
        <Card title="Communication Section">
          <div className="grid gap-6 md:grid-cols-[260px_1fr]">
            <div>
              <FieldLabel>Side Image</FieldLabel>
              <UploadPreview
                label="Image"
                value={comm.image}
                onChange={(v) => setComm({ ...comm, image: v })}
                onReset={() =>
                  setComm({
                    ...comm,
                    image:
                      "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?q=80&w=1200&auto=format&fit=crop",
                  })
                }
                size={180}
                round={false}
              />
            </div>
            <div className="grid gap-4">
              <div>
                <FieldLabel>Title</FieldLabel>
                <TextInput value={comm.title} onChange={(e) => setComm({ ...comm, title: e.target.value })} />
              </div>
              <div>
                <FieldLabel>Description</FieldLabel>
                <TextArea
                  value={comm.description}
                  onChange={(e) => setComm({ ...comm, description: e.target.value })}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* FOOTER */}
      <div className="mt-6">
        <Card title="Footer Section">
          <div className="grid gap-6 md:grid-cols-[auto_1fr]">
            <div className="space-y-3">
              <FieldLabel>Footer Logo</FieldLabel>
              <UploadPreview
                label="Logo"
                value={footerLogo}
                onChange={setFooterLogo}
                onReset={() => setFooterLogo("/logo.svg")}
                size={64}
                round={false}
              />
            </div>

            <div className="grid gap-6">
              {/* Contact */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="md:col-span-3">
                  <FieldLabel>Address</FieldLabel>
                  <TextArea
                    value={contact.address}
                    onChange={(e) => setContact({ ...contact, address: e.target.value })}
                  />
                </div>
                <div>
                  <FieldLabel>Email</FieldLabel>
                  <TextInput
                    type="email"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  />
                </div>
                <div>
                  <FieldLabel>Phone</FieldLabel>
                  <TextInput
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  />
                </div>
              </div>

              {/* Link groups */}
              <div className="space-y-6">
                {groups.map((g, gi) => (
                  <div key={gi} className="rounded-xl border border-gray-200 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <TextInput
                        value={g.title}
                        onChange={(e) => updateGroupTitle(gi, e.target.value)}
                        placeholder="Group title"
                        className="max-w-xs"
                      />
                      <button
                        type="button"
                        onClick={() => removeGroup(gi)}
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-800 hover:bg-gray-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove group
                      </button>
                    </div>

                    <div className="space-y-2">
                      {g.links.map((l, li) => (
                        <div key={li} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                          <TextInput
                            value={l.label}
                            onChange={(e) => updateLink(gi, li, { label: e.target.value })}
                            placeholder="Label"
                          />
                          <div className="relative">
                            <TextInput
                              value={l.href}
                              onChange={(e) => updateLink(gi, li, { href: e.target.value })}
                              placeholder="Href (e.g. /privacy-policy)"
                              className="pl-9"
                            />
                            <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeLinkFromGroup(gi, li)}
                            className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 px-3 text-sm text-gray-800 hover:bg-gray-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => addLinkToGroup(gi)}
                        className="mt-1 inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
                      >
                        <Plus className="h-4 w-4" />
                        Add link
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addGroup}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                  Add group
                </button>
              </div>

              {/* Newsletter */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <FieldLabel>Newsletter Placeholder</FieldLabel>
                  <TextInput
                    value={newsletter.placeholder}
                    onChange={(e) => setNewsletter({ ...newsletter, placeholder: e.target.value })}
                  />
                </div>
                <div>
                  <FieldLabel>Newsletter Button</FieldLabel>
                  <TextInput
                    value={newsletter.button}
                    onChange={(e) => setNewsletter({ ...newsletter, button: e.target.value })}
                  />
                </div>
              </div>

              {/* Sponsors */}
              <div>
                <FieldLabel>Sponsors</FieldLabel>
                <div className="flex flex-wrap items-center gap-4">
                  {sponsors.map((img, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <UploadPreview
                        label="Sponsor"
                        value={img}
                        onChange={(v) => updateSponsor(i, v)}
                        onReset={() => updateSponsor(i, "/logo.svg")}
                        size={56}
                        round={false}
                      />
                      <button
                        type="button"
                        onClick={() => removeSponsor(i)}
                        className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 px-3 text-sm text-gray-800 hover:bg-gray-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addSponsor}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4" />
                    Add sponsor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* SAVE */}
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-semibold text-white hover:bg-black"
        >
          Save
        </button>
      </div>
    </div>
  );
}
