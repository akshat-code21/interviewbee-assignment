"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

const GoogleSignInButton = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = () => {
        setIsLoading(true);
        signIn('google', {
            callbackUrl: '/dashboard'
        });
    };

    return (
        <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full text-sm sm:text-base"
            size="lg"
        >
            <Image src={"/google.png"} alt="google" width={20} height={20} />
            {isLoading ? 'Signing in...' : 'Continue with Google'}
        </Button>
    );
};

export default GoogleSignInButton; 