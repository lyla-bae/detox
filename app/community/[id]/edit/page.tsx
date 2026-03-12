"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/app/components/header";
import CommunityForm from "../../_components/community-form";
import BrandTabs from "../../_components/brand-tabs";
import Button from "@/app/components/button";
import type { CommunityServiceFilter } from "../../_types";
import { useCurrentUserQuery } from "@/query/users";
import {
  useCommunityDetailQuery,
  useUpdateCommunityPostMutation,
} from "@/query/community";

export default function CommunityEditPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [selectedService, setSelectedService] =
    useState<CommunityServiceFilter>("all");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const currentUserQuery = useCurrentUserQuery();
  const communityDetailQuery = useCommunityDetailQuery(id);
  const updateCommunityPostMutation = useUpdateCommunityPostMutation();

  useEffect(() => {
    if (!communityDetailQuery.data) return;

    setSelectedService(communityDetailQuery.data.service);
    setTitle(communityDetailQuery.data.title);
    setContent(communityDetailQuery.data.content);
  }, [communityDetailQuery.data]);

  const isFormValid =
    selectedService !== "all" &&
    title.trim().length > 0 &&
    content.trim().length > 0;

  const handleSubmit = async () => {
    if (!currentUserQuery.data?.id) return;
    if (selectedService === "all") return;

    try {
      await updateCommunityPostMutation.mutateAsync({
        postId: id,
        userId: currentUserQuery.data.id,
        service: selectedService,
        title: title.trim(),
        content: content.trim(),
      });

      router.push(`/community/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (communityDetailQuery.isPending) {
    return (
      <>
        <Header variant="back" title="게시글 수정하기" />
        <main className="px-6 py-8">
          <p className="body-md text-gray-400">게시글을 불러오는 중입니다.</p>
        </main>
      </>
    );
  }

  if (communityDetailQuery.isError || !communityDetailQuery.data) {
    return (
      <>
        <Header variant="back" title="게시글 수정하기" />
        <main className="px-6 py-8">
          <p className="body-md text-gray-400">게시글을 불러오지 못했어요.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Header variant="back" title="게시글 수정하기" />

      <BrandTabs value={selectedService} onChange={setSelectedService} />

      <main className="px-6">
        <CommunityForm
          title={title}
          content={content}
          onTitleChange={setTitle}
          onContentChange={setContent}
        />
      </main>

      <div className="btn-wrap px-5 py-6">
        <Button
          variant="primary"
          size="lg"
          disabled={
            !isFormValid ||
            !currentUserQuery.data?.id ||
            updateCommunityPostMutation.isPending
          }
          loading={updateCommunityPostMutation.isPending}
          onClick={handleSubmit}
        >
          수정 하기
        </Button>
      </div>
    </>
  );
}
