import { redirect } from 'next/navigation';
import DashboardHeader from '@/components/DashboardHeader';
import { InstantMeetingCard } from '@/components/InstantMeetingCard';
import { ScheduledMeetingCard } from '@/components/ScheduledMeetingCard';
import { MeetingsList } from '@/components/MeetingsList';
import { getServerSession } from 'next-auth';

const Dashboard = async () => {
  const session = await getServerSession();
  
  if (!session?.user) {
    redirect('/');
  }

  console.log(session);

  const user = {
    name: session.user.name || 'User',
    email: session.user.email || '',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        userName={user.name}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h2>
          <p className="text-sm sm:text-base text-gray-600">Start an instant meeting or schedule one for later.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          <InstantMeetingCard />
          <ScheduledMeetingCard />
        </div>

        <MeetingsList />
      </main>
    </div>
  );
};

export default Dashboard;
