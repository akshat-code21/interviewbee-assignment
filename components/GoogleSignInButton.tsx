"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const GoogleSignInButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);
            const result = await signIn('google', {
                redirect: false,
                callbackUrl: '/dashboard'
            });
            
            if (result?.error) {
                console.error('Authentication error:', result.error);
            } else if (result?.url) {
                router.push(result.url);
            }
        } catch (error) {
            console.error('Sign in error:', error);
        } finally {
            setIsLoading(false);
        }
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