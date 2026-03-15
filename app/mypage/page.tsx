"use client";

import Image from "next/image";
import { useEffect } from "react";
import Avatar from "../components/avatar";
import Header from "../components/header";
import Input from "../components/input";
import Button from "../components/button";
import BottomNav from "../components/bottom-nav";
import LoadingScreen from "../components/loading-screen";
import TextButton from "../components/text-button";
import { useRouter } from "next/navigation";
import {
  useCurrentUserQuery,
  useLogoutMutation,
  useUserProfileQuery,
} from "@/query/users";
import { useToast } from "../hooks/useToast";

export default function Page() {
  return <MypagePage />;
}
