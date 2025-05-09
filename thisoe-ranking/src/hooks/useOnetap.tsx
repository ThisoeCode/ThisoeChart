"use client"
import { signIn } from "next-auth/react"
import { OneTapOptions } from "@/lib/ts"
import { useCallback } from "react"

export function useOneTap(options: OneTapOptions = {}) {
  const init = useCallback(() => {
    if (typeof window === "undefined") return
    const { google } = window

    if (google?.accounts?.id) {
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: async (response: { credential: string }) => {
          if (response.credential) {
            try{
              // Use the credential from Google One Tap for authentication
              await signIn("google", {
                redirect: false,
              })
            }catch (error){
              console.error("Google sign-in error:", error)
            }
          }
        },
        auto_select: options.auto_select ?? true,
        cancel_on_tap_outside: options.cancel_on_tap_outside ?? false,
      })

      // Render the button or prompt One Tap
      if (options.prompt_parent_id) {
        google.accounts.id.renderButton(document.getElementById(options.prompt_parent_id) as HTMLElement, {
          theme: "outline",
          size: "large",
          type: "standard",
          text: "signin_with",
          shape: "rectangular",
          logo_alignment: "left",
        })
      } else {
        google.accounts.id.prompt((notification) => {
          if (notification.isDismissedMoment()) {
            console.error("[ERR] OneTap dismissed: ", notification.getDismissedReason())
          }
        })
      }
    }
  }, [options])

  return { init }
}
