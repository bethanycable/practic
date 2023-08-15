import type { SubscriptionTier } from "./schemas";
import { tierPolicy } from "./config";

export function hasReachedMaxContacts(tier: SubscriptionTier, contactsCount: number) {
  return contactsCount >=tierPolicy["maxContacts"][tier];
}

export function getUpgradeURL(tier: SubscriptionTier) {
  return tier === "Free" ? "/pricing" : "/account/billing";
}
