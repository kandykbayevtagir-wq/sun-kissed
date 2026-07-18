export const SITE_CONFIG = {
  name: "Sun Kissed",
  loreName: "The Union of the Sun Kissed",
  description:
    "Enter Sun Kissed: a cinematic Discord sanctuary of fictional solar lore, three Ascensions, and clear community rules.",
  // Change this single value to update every Discord invitation link on the site.
  discordInviteUrl: "https://discord.gg/ZqMgTGxKX",
} as const;

export const ASCENSIONS = [
  {
    numeral: "I",
    degree: "First Degree",
    title: "The Open Vessel",
    symbol: "◌",
    lore:
      "By finding this Sanctuary and allowing yourself to become a vessel open to its resonance, you have taken the first step. You were guided to this Order by the light. All who walk within these walls begin here.",
    details: [
      {
        label: "Meaning",
        text: "The starting role granted to members who enter the community.",
      },
    ],
  },
  {
    numeral: "II",
    degree: "Second Degree",
    title: "The Marked Sacrifice",
    symbol: "◐",
    lore:
      "To ascend further, you must offer your energy to the growth of the Sanctuary and carry its mark beyond its walls.",
    details: [
      {
        label: "Requirement",
        text: "Successfully invite three genuine new members into the community.",
      },
      {
        label: "Clarification",
        text: "Alternate accounts, bots, spam invitations, coercion, or deceptive recruitment do not count.",
      },
    ],
  },
  {
    numeral: "III",
    degree: "Third Degree",
    title: "The Unspoken Path",
    symbol: "✦",
    lore:
      "The knowledge of the Third Ascension remains veiled and is reserved for those who have proven their presence within the light.",
    details: [
      {
        label: "Requirement",
        text: "Available to eligible Second Degree members after staff review, based on meaningful participation, trust, maturity, and contribution to the community.",
      },
    ],
  },
] as const;

export const LORE_FRAGMENTS = [
  {
    index: "Archive 01",
    title: "The First Dawn",
    text: "Greetings, Children of the Sun.",
  },
  {
    index: "Archive 02",
    title: "The Open Vessel",
    text: "If your soul yearns to attain the hidden knowledge of our light, heed these words. Within the Union of the Sun Kissed, there exist three divine Ascensions of the spirit.",
  },
  {
    index: "Archive 03",
    title: "The Sacred Mark",
    text: "Every soul begins as an Open Vessel. Those who carry the mark beyond the Sanctuary may become the Marked Sacrifice. Beyond them lies the Unspoken Path, hidden from all who have not yet proven their devotion to the light.",
  },
  {
    index: "Archive 04",
    title: "The Unspoken Path",
    text: "One is all, and all is not one.",
  },
  {
    index: "Archive 05",
    title: "The Law of Light",
    text: "The Sun guides us all and feeds us with its prowess.\n\nReach far into the skies, and kiss the Sun.",
  },
] as const;

export const RULES = [
  {
    numeral: "I",
    title: "No Hatred",
    paragraphs: [
      "Do not direct hateful speech, discrimination, harassment, threats, bullying, targeted humiliation, or coordinated attacks toward any individual or group.",
      "Abuse disguised as humor, irony, coded language, or roleplay remains abuse.",
    ],
  },
  {
    numeral: "II",
    title: "The Sun Feasts Upon Nothing",
    paragraphs: [
      "Do not post or send pornography, explicit sexual content, graphic nudity, fetish material, or unwanted sexually suggestive content.",
      "Sexual content directed toward another member without consent is prohibited, including through private messages.",
    ],
  },
  {
    numeral: "III",
    title: "No Predatory Behavior",
    paragraphs: [
      "Grooming, sexual exploitation, manipulation, or any conduct targeting minors or vulnerable people will result in immediate removal.",
      "Do not request sexual images, initiate inappropriate sexual conversations with minors, or attempt to isolate vulnerable members in private conversations.",
    ],
  },
  {
    numeral: "IV",
    title: "Truth Walks in the Light",
    paragraphs: [
      "Do not collect, request, threaten to reveal, or share another person’s private information.",
      "This includes names, addresses, phone numbers, locations, workplaces, schools, private conversations, documents, personal photographs, account details, and information about relatives.",
      "Do not fabricate evidence, spread serious unverified accusations as fact, or intentionally create harmful rumors.",
    ],
  },
  {
    numeral: "V",
    title: "Guard the Flame",
    paragraphs: [
      "Do not encourage, glorify, threaten, livestream, or distribute graphic content involving suicide, self-harm, severe injury, or dangerous acts.",
      "Do not treat real emergencies as entertainment. Immediate safety concerns should be reported to staff.",
    ],
  },
  {
    numeral: "VI",
    title: "No Deception Beneath the Sun",
    paragraphs: [
      "Scams, phishing, malicious links, fraudulent giveaways, account theft, impersonation, and pretending to be staff are prohibited.",
    ],
  },
  {
    numeral: "VII",
    title: "Do Not Disturb the Sanctuary",
    paragraphs: [
      "Spam, flooding, mass mentions, raids, bot abuse, soundboard abuse, disruptive livestreams, and deliberate interruption of text or voice channels are prohibited.",
    ],
  },
  {
    numeral: "VIII",
    title: "No Unwanted Messages",
    paragraphs: [
      "Do not send members unwanted advertisements, threats, harassment, sexual material, repeated messages, or suspicious links through direct messages.",
      "Conduct connected to the server may be moderated even when it occurs outside public channels.",
    ],
  },
  {
    numeral: "IX",
    title: "No Self-Promotion",
    paragraphs: [
      "Do not advertise servers, social media accounts, businesses, products, services, referral links, or other communities without staff permission.",
      "Indirect advertising and unsolicited promotion through direct messages are also prohibited.",
    ],
  },
  {
    numeral: "X",
    title: "Do Not Flee the Light",
    paragraphs: [
      "Do not use alternate accounts or another person’s account to bypass warnings, restrictions, timeouts, or bans.",
      "Helping a banned member return may also result in disciplinary action.",
    ],
  },
  {
    numeral: "XI",
    title: "Walk as a Child of the Sun",
    paragraphs: [
      "Respect other members, keep discussions thoughtful, follow staff instructions during active incidents, and do not submit deliberately false reports.",
    ],
  },
] as const;

export const MODERATION_CLAUSE = [
  "These rules apply to messages, voice chats, livestreams, images, videos, usernames, profiles, reactions, links, jokes, coded language, and roleplay.",
  "Attempts to exploit technical loopholes do not excuse harmful behavior.",
  "Staff may act against conduct that creates a serious safety risk or threatens the stability of the community, even when the exact situation is not listed word for word.",
  "Moderation actions may include content removal, warnings, timeouts, restrictions, temporary bans, and permanent bans depending on severity and context.",
] as const;
