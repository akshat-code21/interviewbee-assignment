export interface Meeting {
    id: string;
    title: string;
    description: string;
    date: Date;
    startTime: string;
    endTime: string;
    link: string;
    type: 'instant' | 'scheduled';
    status: 'upcoming' | 'ongoing' | 'completed';
}