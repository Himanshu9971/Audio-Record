'use client'

import React, { useState } from 'react';
import InputField from '../input-fields/InputFields';
import SignUpData from '../signup-data/SignupData';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const router = useRouter();
    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|co)$/;
        const doubleExtensionRegex = /\.(com|in|org|net|co)\.\1$/;
        if (doubleExtensionRegex.test(email)) {
            return false;
        }
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,15}$/;
        return passwordRegex.test(password);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const emailError = validateEmail(formData.email) ? '' : 'Invalid email format. It should not have multiple extensions like ".com.com" or ".in.in".';
        const passwordError = validatePassword(formData.password)
            ? ''
            : 'Password must be between 6-15 characters, include 1 uppercase, 1 lowercase, 1 number, and 1 special character.';

        setErrors({ email: emailError, password: passwordError });

        if (!emailError && !passwordError) {
            console.log('Email:', formData.email);
            console.log('Password:', formData.password);

            router.push('/audio-to-text');
        }
    };

    const isSubmitDisabled = Boolean(!formData.email || !formData.password || errors.email || errors.password);

    return (
        <div className='flex flex-col items-center bg-[#F1F3F6] rounded-3xl py-16 w-full max-w-1/2'>
            <div className='w-full flex flex-col items-center gap-4'>
                <h2 className='text-2xl font-medium'>Create an account</h2>
                <p className='text-md'>
                    Already have an account? <span className='text-blue-500'>Sign in</span>
                </p>
            </div>
            <form onSubmit={handleSubmit} className='w-full flex flex-col items-center gap-4 mt-16'>
                <InputField
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    error={errors.email}
                />

                <InputField
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    showPasswordToggle={true}
                    error={errors.password}
                />

                <button
                    type="submit"
                    className={`w-2/3 p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none ${isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isSubmitDisabled}
                >
                    Login
                </button>
            </form>
            <SignUpData />
        </div>
    );
};

export default LoginForm;
