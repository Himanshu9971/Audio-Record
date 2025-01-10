import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";

const SignUpData = () => {
    return (
        <div className="flex justify-center items-center w-2/3">
            <div className="w-full p-8">
                <div className="flex items-center mb-8">                    
                    <div className="flex-grow border-t border-gray-300"></div>                    
                    <h2 className="text-sm mx-4 text-center">or sign up with</h2>                    
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <div className="flex justify-around items-center">
                    <button className="w-20 h-12 bg-gray-200 rounded-lg flex items-center justify-center space-x-3 transition">
                        <FaApple size={24} />
                    </button>

                    <button className="w-20 h-12 bg-gray-200 rounded-lg flex items-center justify-center space-x-3 transition">
                        <FcGoogle size={24} />
                    </button>

                    <button className="w-20 h-12 bg-gray-200 rounded-lg flex items-center justify-center space-x-3 transition">
                        <FaFacebook size={24} />
                    </button>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>
                        By clicking Create, you agree to our{' '}
                        <a href="/terms" className="text-blue-600 hover:underline">
                            Terms and Conditions
                        </a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpData;
