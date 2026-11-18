import { createFileRoute } from "@tanstack/react-router";
import { JoinForm } from "../join";

export const Route = createFileRoute("/soebld/join/$slug")({
  component: SlugJoin,
});

function SlugJoin() {
  const { slug } = Route.useParams();
  return <JoinForm slug={slug} />;
}
