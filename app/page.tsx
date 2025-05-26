import { Video } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import GoogleSignInButton from '@/components/GoogleSignInButton';

const HomePage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-6 sm:space-y-8">
                <div className="text-center">
                    <div className="flex justify-center mb-3 sm:mb-4">
                        <Video className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome to MeetApp</h2>
                    <p className="mt-2 text-sm sm:text-base text-gray-600">
                        Sign in to start creating and scheduling meetings
                    </p>
                </div>

                <Card className="w-full">
                    <CardHeader className="text-center pb-4">
                        <CardTitle className="text-lg sm:text-xl">Sign In</CardTitle>
                        <CardDescription className="text-sm">
                            Use your Google account to get started
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-4 sm:px-6">
                        <GoogleSignInButton />

                        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500">
                            <p className="leading-relaxed">
                                By signing in, you agree to our{' '}
                                <a href="#" className="text-blue-600 hover:underline">
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="#" className="text-blue-600 hover:underline">
                                    Privacy Policy
                                </a>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default HomePage;
