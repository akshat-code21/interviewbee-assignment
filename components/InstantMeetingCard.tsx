"use client"
import { useState } from 'react';
import { Video, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { toast } from 'sonner';

export const InstantMeetingCard = () => {
  const [meetingLink, setMeetingLink] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateMeetingLink = async () => {
    setIsGenerating(true);
    try {
      const response = await axios.get('/api/createMeeting');
      setMeetingLink(response.data.meetLink);
      setIsGenerating(false);
    } catch (error) {
      console.error('Error generating meeting link:', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetingLink);
    toast.info('Meeting link copied to clipboard.');
  };

  const joinMeeting = () => {
    window.open(meetingLink, '_blank');
  };

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg sm:text-xl">
          <Video className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-600" />
          Instant Meeting
        </CardTitle>
        <CardDescription className="text-sm">
          Start a meeting right now with a Google Meet link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button 
            onClick={generateMeetingLink} 
            disabled={isGenerating}
            className="w-full text-sm sm:text-base"
            size="lg"
          >
            {isGenerating ? 'Generating...' : 'Start Instant Meeting'}
          </Button>
          
          {meetingLink && (
            <div className="space-y-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <Input 
                  value={meetingLink} 
                  readOnly 
                  className="flex-1 text-xs sm:text-sm"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={copyToClipboard}
                  className="w-full sm:w-auto"
                >
                  <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-0 sm:ml-0" />
                  <span className="sm:hidden">Copy Link</span>
                </Button>
              </div>
              <Button 
                onClick={joinMeeting}
                className="w-full text-sm sm:text-base"
                variant="secondary"
              >
                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Join Meeting
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
