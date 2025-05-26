"use client"
import { useState } from 'react';
import { Calendar, Clock, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export const ScheduledMeetingCard = () => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isScheduling, setIsScheduling] = useState(false);

  const scheduleMeeting = async () => {
    if (!date || !time || !title) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsScheduling(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockMeetingId = Math.random().toString(36).substr(2, 9);
      const meetingLink = `https://meet.google.com/${mockMeetingId}`;
      
      setIsScheduling(false);
      
      toast.success(`Your meeting "${title}" has been scheduled for ${format(date, 'PPP')} at ${time}.`);
      
      // Reset form
      setDate(undefined);
      setTime('');
      setTitle('');
      setDescription('');
    }, 1500);
  };

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg sm:text-xl">
          <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-600" />
          Schedule Meeting
        </CardTitle>
        <CardDescription className="text-sm">
          Plan a meeting for a future date and time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-sm font-medium">Meeting Title *</Label>
            <Input
              id="title"
              placeholder="Enter meeting title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 text-sm"
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium">Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal mt-1 text-sm",
                    !date && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="time" className="text-sm font-medium">Time *</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1 text-sm"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add meeting description or agenda"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 text-sm resize-none"
            />
          </div>

          <Button 
            onClick={scheduleMeeting} 
            disabled={isScheduling}
            className="w-full text-sm sm:text-base"
            size="lg"
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            {isScheduling ? 'Scheduling...' : 'Schedule Meeting'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
