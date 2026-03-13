import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useLoginMutation } from "@/redux/services/user-api";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUserType";
import { useNavigate } from "react-router-dom";
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginMutation();
  useUser();
  const handleSubmit = (values, { resetForm }) => {
    loginUser(values)
      .unwrap()
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("isLoggedIn", true);
        // navigate("/admin");
        navigate("/products");
        toast.success(res.message);
      })
      .catch((error) => {
        toast.error(error.data.message);
      })
      .finally(() => {
        resetForm();
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px] sm:mx-0 mx-2">
        <CardContent>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-4">
                {/* Email */}
                <div>
                  <Label className={"mb-2"}>Email</Label>
                  <Field
                    as={Input}
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <Label className={"mb-2"}>Password</Label>
                  <Field
                    as={Input}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-8 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader className="animate-spin" /> : "Login"}
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
