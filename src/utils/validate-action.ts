import { getUser } from '@/lib/dal';
import { DirectusUser } from '@directus/sdk';
import z from 'zod';

export type ActionState = {
    success?: string;
    zodErrors?: Record<string, string[]>;
    message?: string;
    [key: string]: any; // This allows for additional properties
};

type ValidatedActionFunction<S extends z.ZodType<any, any>, T> = (data: z.infer<S>, formData: FormData) => Promise<T>;

export function validatedAction<S extends z.ZodType<any, any>, T>(schema: S, action: ValidatedActionFunction<S, T>) {
    return async (prevState: ActionState, formData: FormData) => {
        const result = schema.safeParse(Object.fromEntries(formData));
        if (!result.success) {
            return {
                ...prevState,
                zodErrors: result.error.flatten().fieldErrors,
                message: 'Validate schema failed',
            };
        }

        return action(result.data, formData);
    };
}

type ValidatedActionWithUserFunction<S extends z.ZodType<any, any>, T> = (
    data: z.infer<S>,
    formData: FormData,
    user: DirectusUser,
) => Promise<T>;

export function validatedActionWithUser<S extends z.ZodType<any, any>, T>(
    schema: S,
    action: ValidatedActionWithUserFunction<S, T>,
) {
    return async (prevState: ActionState, formData: FormData) => {
        const user = await getUser();
        if (!user) {
            // redirect('/auth/login');
            throw new Error('User is not authenticated');
        }

        const result = schema.safeParse(Object.fromEntries(formData));
        if (!result.success) {
            return { error: result.error.message };
        }

        return action(result.data, formData, user);
    };
}
