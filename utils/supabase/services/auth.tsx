import { SupabaseService } from '.'

export class SupabaseAuthService extends SupabaseService {
  // set up email and password with supavase auth here
  async signUpWithEmailAndPassword (email: string, password: string) {
    const { data, error } = await this.client.auth.signUp({
      email,
      password
    })
    if (error) {
      return {
        success: false,
        error: error,
        message: error.message
      }
    }
    return {
      success: true,
      data: data
    }
  }

  async signInWithEmailAndPassword (email: string, password: string) {
    const { data, error } = await this.client.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      return {
        success: false,
        error: error,
        message: error.message
      }
    }
    return {
      success: true,
      data: data
    }
  }

  async resetPasswordForEmail (email: string, redirectTo?: string) {
    const { data, error } = await this.client.auth.resetPasswordForEmail(
      email,
      {
        redirectTo:
          redirectTo ||
          (process.env.NEXT_PUBLIC_FRONTEND_URL
            ? `${process.env.NEXT_PUBLIC_FRONTEND_URL}/account/update-password`
            : undefined)
      }
    )
    if (error) {
      return {
        success: false,
        error: error,
        message: error.message
      }
    }
    return {
      success: true,
      data: data
    }
  }

  async updatePassword (newPassword: string) {
    const { data, error } = await this.client.auth.updateUser({
      password: newPassword
    })
    if (error) {
      return {
        success: false,
        error: error,
        message: error.message
      }
    }
    return {
      success: true,
      data: data
    }
  }
}

export const supabaseAuthService = new SupabaseAuthService()
