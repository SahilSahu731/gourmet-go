"use client";

import {
  Share2,
  Link as LinkIcon,
  Facebook,
  Twitter,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ShareButton({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };

  const handleShare = (platform: string) => {
    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this recipe: ${title}`)}&url=${encodeURIComponent(url)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
    }
    if (shareUrl) window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white"
        onClick={handlePrint}
        title="Print Recipe"
      >
        <Printer className="h-4 w-4" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-zinc-900 border-zinc-800 text-zinc-200"
        >
          <DropdownMenuItem
            onClick={handleCopyLink}
            className="cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800"
          >
            <LinkIcon className="mr-2 h-4 w-4" /> Copy Link
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleShare("twitter")}
            className="cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800"
          >
            <Twitter className="mr-2 h-4 w-4" /> Share on Twitter
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleShare("facebook")}
            className="cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800"
          >
            <Facebook className="mr-2 h-4 w-4" /> Share on Facebook
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
