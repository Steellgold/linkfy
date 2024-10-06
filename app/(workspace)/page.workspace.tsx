"use client";

import { useGetWorkspaces } from "@/lib/actions/workspace/workspace.hook";
import { redirect } from "next/navigation";
import { ReactElement, useState } from "react";
import { SortOptions, WorkspaceLinks } from "./section.links";
import { useWorkspaceStore } from "@/lib/store/workspace.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, LayoutDashboard, Plus } from "lucide-react";
import { WorkspaceLayout } from "./workspace.layout";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const PageWorkspace = (): ReactElement => {
  const { data } = useGetWorkspaces();
  const { selectedWorkspaceId } = useWorkspaceStore();
  const [searchFilter, setSearchFilter] = useState<string>("");

  // Filters options
  const [sortBy, setSortBy] = useState<SortOptions["by"]>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOptions["order"]>("desc");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [archived, setArchived] = useState<boolean>(false);
  // Display options
  const [showNotes, setShowNotes] = useState(true);
  const [showExpires, setShowExpires] = useState(true);
  const [showCreatedBy, setShowCreatedBy] = useState(true);
  const [showCreatedAt, setShowCreatedAt] = useState(true);
  const [showFavicons, setShowFavicons] = useState(true);
  const [showTags, setShowTags] = useState(true);
  const [showClicks, setShowClicks] = useState(true);

  if (!data || data.length === 0) {
    redirect("/new-workspace");
  }

  const handleUserChange = (user: string) => {
    setSelectedUsers(prev => 
      prev.includes(user) ? prev.filter(u => u !== user) : [...prev, user]
    )
  }

  const handleTagChange = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const workspace = selectedWorkspaceId ? data.find(workspace => workspace.id === selectedWorkspaceId) : data[0];

  return (
    <WorkspaceLayout
      actions={
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <Input placeholder="Search links" value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} />
          <div className="flex flex-row gap-2 w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto gap-1.5">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Sort by</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup value={sortBy} onValueChange={(value) => setSortBy(value as "createdAt" | "clicks" | "expires")}>
                        <DropdownMenuRadioItem value="createdAt">Creation date</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="clicks">Clics count</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="expires">Expiration date</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Order</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup value={sortOrder} onValueChange={(value) => setSortOrder(value as "asc" | "desc")}>
                        <DropdownMenuRadioItem value="asc">Ascending (A-Z)</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="desc">Descending (Z-A)</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Tags</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuCheckboxItem checked={selectedTags.length === 0} onCheckedChange={() => setSelectedTags([])} disabled={selectedTags.length === 0}>
                        {selectedTags.length === 0 ? "All tags" : "Select all"}
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuSeparator />
                      {workspace?.tags.map(tag => (
                        <DropdownMenuCheckboxItem key={tag.id} checked={selectedTags.includes(tag.id)} onCheckedChange={() => handleTagChange(tag.id)}>
                          <span className="rounded-md h-2 w-2 mr-2" style={{ backgroundColor: tag.color }} />
                          {tag.name}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Members</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuCheckboxItem checked={selectedUsers.length === 0} onCheckedChange={() => setSelectedUsers([])} disabled={selectedUsers.length === 0}>
                        {selectedUsers.length === 0 ? "All members" : "Select all"}
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuSeparator />
                      {workspace?.members.map(member => (
                        <DropdownMenuCheckboxItem key={member.id} checked={selectedUsers.includes(member.id)} onCheckedChange={() => handleUserChange(member.id)}>
                          <Avatar className={`h-5 w-5 mr-2`}>
                            <AvatarImage src={member.user.image ?? ""} alt={member.user.name ?? "Avatar"} />
                            <AvatarFallback>{(member.user.name ?? "").charAt(0)}</AvatarFallback>
                          </Avatar>
                          
                          {member.user.name}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto gap-1.5">
                  <LayoutDashboard className="h-4 w-4" />
                  Display
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuCheckboxItem checked={showNotes} onCheckedChange={setShowNotes}>
                  Notes
                </DropdownMenuCheckboxItem>

                <DropdownMenuCheckboxItem checked={showExpires} onCheckedChange={setShowExpires}>
                  Expiration date
                </DropdownMenuCheckboxItem>

                <DropdownMenuCheckboxItem checked={showCreatedBy} onCheckedChange={setShowCreatedBy}>
                  Created by
                </DropdownMenuCheckboxItem>

                <DropdownMenuCheckboxItem checked={showCreatedAt} onCheckedChange={setShowCreatedAt}>
                  Creation date
                </DropdownMenuCheckboxItem>

                <DropdownMenuCheckboxItem checked={showFavicons} onCheckedChange={setShowFavicons}>
                  Favicons
                </DropdownMenuCheckboxItem>

                <DropdownMenuCheckboxItem checked={showTags} onCheckedChange={setShowTags}>
                  Tags
                </DropdownMenuCheckboxItem>

                <DropdownMenuCheckboxItem checked={showClicks} onCheckedChange={setShowClicks}>
                  Clicks count
                </DropdownMenuCheckboxItem>

                <DropdownMenuCheckboxItem checked={archived} onCheckedChange={setArchived}>
                  Archived
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      }
      mobileAction={
        <Button className="gap-1.5" variant="outline">
          <Plus className="h-4 w-4" />
          New link
        </Button>
      }
      header="Links"
    >
      <div className="sm:px-2">
        <WorkspaceLinks
          workspaceId={selectedWorkspaceId || data[0].id}
          filterBy={{
            tags: selectedTags,
            search: searchFilter,
            user: selectedUsers,
            sort: {
              by: sortBy,
              order: sortOrder,
            },
          }}
          display={{
            notes: showNotes,
            expires: showExpires,
            createdBy: showCreatedBy,
            createdAt: showCreatedAt,
            favicons: showFavicons,
            tags: showTags,
            clicks: showClicks,
            archived,
          }}
          resetFilters={() => {
            setSelectedTags([]);
            setSelectedUsers([]);
            setSearchFilter("");
            setSortBy("createdAt");
            setSortOrder("desc");
            setShowNotes(true);
            setShowExpires(true);
            setShowCreatedBy(true);
            setShowCreatedAt(true);
            setShowFavicons(true);
            setShowTags(true);
            setShowClicks(true);
            setArchived(true);
          }}
        />
      </div>
    </WorkspaceLayout>
  );
};