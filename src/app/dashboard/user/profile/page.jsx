"use client";
import { PageTitle } from "@/components/dashboard/Shell";
import ProfileForm from "@/components/ProfileForm";

export default function Profile() {
  return (<><PageTitle title="Profile" hint="Manage how you appear on ArtHub." /><ProfileForm /></>);
}
