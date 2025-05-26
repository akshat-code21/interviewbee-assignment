"use client"
import { useContext, useState } from 'react';
import { Calendar, Clock, Copy, ExternalLink, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { MeetingContext } from '@/context/MeetingContext';

interface Meeting {
  id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  link: string;
  type: 'instant' | 'scheduled';
  status: 'upcoming' | 'ongoing' | 'completed';
}

export const MeetingsList = () => {
  const { meetings, setMeetings } = useContext(MeetingContext);

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.info("Meeting link copied to clipboard.");
  };

  const joinMeeting = (link: string) => {
    window.open(link, '_blank');
  };

  const deleteMeeting = (id: string) => {
    toast.error("The meeting has been removed from your list.");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl">Your Meetings</CardTitle>
        <CardDescription className="text-sm">
          Manage your scheduled and past meetings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 sm:space-y-4">
          {meetings.length === 0 ? (
            <div className="text-center py-6 sm:py-8 text-gray-500">
              <Calendar className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-gray-300" />
              <p className="text-sm sm:text-base">No meetings found. Create your first meeting above!</p>
            </div>
          ) : (
            meetings.map((meeting,index) => (
              <div 
                key={index} 
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border rounded-lg hover:bg-gray-50 transition-colors space-y-3 sm:space-y-0"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{meeting.title}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getStatusColor(meeting.status)} text-xs`}>
                        {meeting.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {meeting.type}
                      </Badge>
                    </div>
                  </div>
                  
                  {meeting.description && (
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{meeting.description}</p>
                  )}
                  
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      {formatDate(meeting.date.toISOString())}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      {meeting.startTime} - {meeting.endTime} 
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-end space-x-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyLink(meeting.link)}
                    className="text-xs"
                  >
                    <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="ml-1 sm:hidden">Copy</span>
                  </Button>
                  
                  {meeting.status !== 'completed' && (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => joinMeeting(meeting.link)}
                      className="text-xs"
                    >
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Join
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteMeeting(meeting.id)}
                    className="text-red-600 hover:text-red-700 text-xs"
                  >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="ml-1 sm:hidden">Delete</span>
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
