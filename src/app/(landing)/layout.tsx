import LandingNavbar from '@/components/layouts/landing-navbar';

export default function LandingPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-sm:w-screen">
      <LandingNavbar />
      {children}
    </div>
  );
}
