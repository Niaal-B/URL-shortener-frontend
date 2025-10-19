import { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "@/api/api";

export default function RedirectHandler() {
  const { orgSlug, slug } = useParams();

  useEffect(() => {
    api
      .get("/api/urls/resolve/", {
        params: { organization_slug: orgSlug, slug },
      })
      .then((res) => {
        window.location.href = res.data.original_url;
      })
      .catch(() => {
      });
  }, [orgSlug, slug]);

  return <p>Redirecting...</p>;
}
