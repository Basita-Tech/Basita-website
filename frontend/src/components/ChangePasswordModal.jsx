import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { changePassword } from "../api/auth";

const INITIAL_FORM = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const INITIAL_VISIBILITY = {
  oldPassword: false,
  newPassword: false,
  confirmPassword: false,
};

function PasswordField({
  id,
  label,
  value,
  error,
  show,
  onChange,
  onToggle,
  onFocus,
  onBlur,
  placeholder,
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-medium">
        {label}
      </Label>

      <div
        className={`relative rounded-xl border ${
          error ? "border-red-accent" : "border-border-subtle"
        }`}
      >
        <Input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          className="h-10 border-0 bg-transparent pr-12 rounded-xl"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute w-11 right-0 top-0 bottom-0 p-0 flex justify-center items-center bg-transparent text-gray-500 hover:text-gray-700 transition-colors"
          tabIndex={-1}
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {error && <p className="text-xs text-red-accent">{error}</p>}
    </div>
  );
}

export function ChangePasswordModal({ open, onOpenChange }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(INITIAL_VISIBILITY);
  const [loading, setLoading] = useState(false);
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    if (!open) {
      setForm(INITIAL_FORM);
      setErrors({});
      setVisible(INITIAL_VISIBILITY);
      setShowRules(false);
    }
  }, [open]);

  const validate = () => {
    const next = {};

    if (!form.oldPassword) {
      next.oldPassword = "Old password is required";
    }

    if (!form.newPassword) {
      next.newPassword = "New password is required";
    } else if (form.newPassword.length < 8) {
      next.newPassword = "Must be at least 8 characters";
    } else if (form.newPassword === form.oldPassword) {
      next.newPassword = "New password must be different";
    }

    if (!form.confirmPassword) {
      next.confirmPassword = "Please confirm your password";
    } else if (form.confirmPassword !== form.newPassword) {
      next.confirmPassword = "Passwords do not match";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const toggleVisibility = (key) => {
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await changePassword(
        form.oldPassword,
        form.newPassword,
        form.confirmPassword,
      );

      if (res?.success) {
        toast.success(res.message || "Password changed successfully");
        onOpenChange(false);
      } else {
        toast.error(res.message || "Failed to change password");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Failed to change password. Please try again.";
      toast.error(msg);

      if (msg.toLowerCase().includes("old password")) {
        setErrors({ oldPassword: msg });
      }
    } finally {
      setLoading(false);
    }
  };

  const rules = {
    length: form.newPassword.length >= 8,
    different:
      form.oldPassword &&
      form.newPassword &&
      form.oldPassword !== form.newPassword,
    mix:
      /[A-Za-z]/.test(form.newPassword) &&
      /\d/.test(form.newPassword) &&
      /[@$!%*?&#_]/.test(form.newPassword),
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] p-0 gap-0 overflow-hidden shadow-2xl">
        <div className="relative bg-gold px-5 py-4 text-center text-white">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <Lock className="h-8 text-white w-8" />
          </div>

          <DialogHeader>
            <DialogTitle className="text-lg">Change Password</DialogTitle>
          </DialogHeader>

          <p className="text-xs opacity-90">Keep your account secure</p>
        </div>
        <form onSubmit={submit} className="space-y-4 px-5 py-4 bg-white">
          <PasswordField
            id="oldPassword"
            label="Old Password"
            value={form.oldPassword}
            error={errors.oldPassword}
            show={visible.oldPassword}
            onChange={(v) => updateField("oldPassword", v)}
            onToggle={() => toggleVisibility("oldPassword")}
            placeholder="Enter old password"
          />

          <PasswordField
            id="newPassword"
            label="New Password"
            value={form.newPassword}
            error={errors.newPassword}
            show={visible.newPassword}
            onChange={(v) => updateField("newPassword", v)}
            onToggle={() => toggleVisibility("newPassword")}
            onFocus={() => setShowRules(true)}
            onBlur={() => setShowRules(false)}
            placeholder="Enter new password"
          />

          {showRules && (
            <div className="rounded-xl bg-beige p-3 text-[11px] space-y-1">
              <p className="font-medium">Password must:</p>
              <ul className="space-y-0.5">
                <li
                  className={rules.length ? "text-green-600" : "text-red-500"}
                >
                  • Be at least 8 characters
                </li>
                <li
                  className={
                    rules.different ? "text-green-600" : "text-red-500"
                  }
                >
                  • Be different from old password
                </li>
                <li className={rules.mix ? "text-green-600" : "text-red-500"}>
                  • Include letters, numbers & symbols
                </li>
              </ul>
            </div>
          )}

          <PasswordField
            id="confirmPassword"
            label="Confirm New Password"
            value={form.confirmPassword}
            error={errors.confirmPassword}
            show={visible.confirmPassword}
            onChange={(v) => updateField("confirmPassword", v)}
            onToggle={() => toggleVisibility("confirmPassword")}
            placeholder="Confirm new password"
          />

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="flex-1 rounded-xl"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gold hover:bg-gold/90 rounded-xl"
            >
              {loading ? "Changing..." : "Change Password"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
