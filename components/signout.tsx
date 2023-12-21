// components/SignOutButton.js
import { useRouter } from "next/router";
import { useEffect } from "react";
import Button from "@mui/material/Button";

const SignOutButton = () => {
  const router = useRouter();

    const handleSignOut = () => {
        localStorage.removeItem("jwt");
        router.push("/");
    };

  return (
    <Button variant="contained" color="secondary" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
