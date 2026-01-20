import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { TabsComponent } from "./TabsComponent";
import { ProfileCard } from "./ProfileCard";

const normalizeId = (p) => {
  const u = p?.user || p;
  return String(
    u?.id ?? u?.userId ?? u?._id ?? p?.id ?? p?.userId ?? p?._id ?? "",
  );
};

const normalizeName = (p) => {
  const u = p?.user || p;
  return (
    p?.name ??
    u?.name ??
    `${u?.firstName ?? ""} ${u?.lastName ?? ""}`.trim() ??
    "Unknown"
  );
};

const prepareProfile = (p) => {
  const u = p?.user || p;
  const scoreDetail = p?.scoreDetail || u?.scoreDetail;

  return {
    ...u,
    ...p,
    id: normalizeId(p),
    name: normalizeName(p),
    age: u?.age,
    profession:
      p?.profession ??
      u?.profession ??
      u?.professional?.Occupation ??
      u?.occupation ??
      "",
    city:
      p?.city ??
      u?.city ??
      u?.personal?.city ??
      u?.personal?.full_address?.city ??
      "",
    religion: u?.religion ?? u?.personal?.religion ?? "",
    caste: u?.subCaste ?? u?.personal?.subCaste ?? "",
    image: u?.closerPhoto?.url ?? p?.image ?? "",
    compatibility: scoreDetail?.score ?? p?.compatibility ?? 0,
    status: u?.status ?? p?.status ?? null,
  };
};

export function AddProfileModal({
  open,
  onOpenChange,
  profiles = [],
  shortlistedProfiles = [],
  onAddToCompare,
  onRemoveCompare,
  compareProfileIds = [],
  shortlistedIds = [],
  onToggleShortlist,
}) {
  const [activeTab, setActiveTab] = useState("browse");
  const [searchQuery, setSearchQuery] = useState("");
  const [addingIds, setAddingIds] = useState([]);

  const compareIdStrs = useMemo(
    () => compareProfileIds.map((id) => String(id)),
    [compareProfileIds],
  );

  const tabs = [
    { key: "browse", label: "Browse All" },
    { key: "shortlisted", label: "Shortlisted" },
  ];

  const filteredProfiles = useMemo(() => {
    const base = activeTab === "shortlisted" ? shortlistedProfiles : profiles;

    const dedup = new Map();

    for (const p of base) {
      const id = normalizeId(p);
      if (!id || dedup.has(id)) continue;
      dedup.set(id, prepareProfile(p));
    }

    let result = Array.from(dedup.values()).filter(
      (p) => !compareIdStrs.includes(String(p.id)),
    );

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => {
        return (
          p.name.toLowerCase().includes(q) ||
          p.profession.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q)
        );
      });
    }

    return result.slice(0, 6);
  }, [activeTab, profiles, shortlistedProfiles, compareIdStrs, searchQuery]);

  const handleAdd = async (id, profile) => {
    const pid = String(id);
    if (compareIdStrs.includes(pid)) return;

    if (compareIdStrs.length >= 5) {
      toast.error("You can compare up to 5 profiles only.");
      return;
    }

    setAddingIds((s) => [...new Set([...s, pid])]);

    try {
      await onAddToCompare?.(id, profile);
    } catch (err) {
      console.error("Add to compare failed", err);
      toast.error("Failed to add profile");
    } finally {
      setAddingIds((s) => s.filter((x) => x !== pid));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl p-0 bg-white">
        <div className="px-8 py-6 border-b">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Add Profile to Compare
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="px-8 py-6 max-h-[75vh] overflow-y-auto">
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />

              <Input
                placeholder="Search by name, profession or city"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="!pl-10 rounded-xl"
              />
            </div>

            <TabsComponent
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {filteredProfiles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProfiles.map((profile) => {
                  const pid = String(profile.id);
                  return (
                    <ProfileCard
                      key={pid}
                      {...profile}
                      variant="browse"
                      onView={() => {}}
                      onSendRequest={() => {}}
                      onAddToCompare={(id) => handleAdd(id, profile)}
                      onRemoveCompare={onRemoveCompare}
                      isInCompare={compareIdStrs.includes(pid)}
                      isShortlisted={shortlistedIds.some(
                        (sid) => String(sid) === pid,
                      )}
                      onToggleShortlist={onToggleShortlist}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-14 text-muted-foreground">
                {searchQuery
                  ? "No profiles match your search"
                  : activeTab === "shortlisted"
                    ? "No shortlisted profiles available"
                    : "No profiles available to add"}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
