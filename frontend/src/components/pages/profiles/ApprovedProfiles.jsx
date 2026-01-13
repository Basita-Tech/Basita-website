import { useState } from "react";
import { MessageCircle, Users } from "lucide-react";
import { ProfileCard } from "../../ProfileCard";
import { PremiumUpgradeModal } from "../../PremiumUpgradeModal";
import { downloadUserPdf } from "../../../api/auth";
import toast from 'react-hot-toast';
export function ApprovedProfiles({
  profiles = [],
  onViewProfile,
  onAddToCompare,
  onRemoveCompare,
  compareProfiles = [],
  shortlistedIds = [],
  onToggleShortlist
}) {
  const [premiumModal, setPremiumModal] = useState(false);
  const handleDownloadPDF = async profile => {
    try {
      const userId = profile?.id || profile?.userId || profile?._id;
      if (!userId) {
        toast.error('Unable to download: User ID not found');
        return;
      }
      
      toast.loading('Preparing download...', { id: 'pdf-download' });
      await downloadUserPdf(userId);
      toast.dismiss('pdf-download');
    } catch (error) {
      toast.dismiss('pdf-download');
      console.error('PDF download error:', error);
      toast.error('Error downloading PDF: ' + (error.message || 'Unknown error'));
    }
  };
  const approvedProfiles = profiles.filter(p => p.status?.toLowerCase() === "accepted" || p.status?.toLowerCase() === "approved");
  return <div className="max-w-[1440px] mx-auto px-3 md:px-6 lg:px-8 py-6 space-y-6">
      {}
      <div>
        <h2 className="m-0 mb-2 text-2xl font-semibold text-[#3a2f00]">Approved Profiles</h2>
        <p className="text-muted-foreground m-0">Mutual matches – both parties have shown interest</p>
      </div>

      {}
      {approvedProfiles.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {approvedProfiles.map(profile => <ProfileCard key={profile.id} {...profile} variant="approved" onView={onViewProfile} onAddToCompare={onAddToCompare} onRemoveCompare={onRemoveCompare} onChat={() => setPremiumModal(true)} onDownloadPDF={() => handleDownloadPDF(profile)} isInCompare={Array.isArray(compareProfiles) ? compareProfiles.map(String).includes(String(profile.id || profile._id || profile.userId)) : false} isShortlisted={Array.isArray(shortlistedIds) ? shortlistedIds.some(sid => String(sid) === String(profile.id)) : false} onToggleShortlist={onToggleShortlist} />)}
        </div> : <div className="bg-white rounded-[20px] p-16 satfera-shadow text-center">
          <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-[#f9f5ed] flex items-center justify-center">
              <Users className="w-10 h-10 text-[#c8a227]" />
            </div>
            <h3 className="m-0 text-gray-900">No approved matches yet</h3>
            <p className="text-muted-foreground m-0">
              When both you and another member show interest, they'll appear
              here. Keep browsing and sending requests!
            </p>
          </div>
        </div>}

      {}
      <PremiumUpgradeModal open={premiumModal} onOpenChange={setPremiumModal} />
    </div>;
}