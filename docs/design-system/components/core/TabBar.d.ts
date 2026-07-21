import * as React from "react";

export type TabItem = string | { key: string; label: string };

export interface TabBarProps {
  /** Tab keys, or {key,label} pairs. */
  tabs: TabItem[];
  /** The active tab key. */
  active: string;
  onChange?: (key: string) => void;
  style?: React.CSSProperties;
}

/**
 * Top-level pill tab navigation. Active pill is gold.
 * @dsCard group="Components"
 * @startingPoint section="Navigation" subtitle="Pill tab strip" viewport="700x120"
 */
export function TabBar(props: TabBarProps): React.ReactElement;
