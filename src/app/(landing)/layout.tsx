import LandingNavbar from '@/components/layouts/landing-navbar';

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingNavbar />
      {children}
    </>
  );
}
