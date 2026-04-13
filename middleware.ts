import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    response = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser()

    // Create array of protected paths
    const protectedPaths = ["/dashboard", "/profile"]

    if (user && request.nextUrl.pathname === '/auth') {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (!user) {
         for(const path of protectedPaths){
             if (request.nextUrl.pathname.startsWith(path)){
                 return NextResponse.redirect(new URL('/auth', request.url))
             }
         }
    }
    const {data} = await supabase.auth.getSession();
    const url = new URL(request.url);
    if(data.session){
        if(url.pathname === "/auth"){
            return NextResponse.redirect(new URL('/', request.url))
        }
        return response;
    } else {
        if(protectedPaths.includes(url.pathname)){
            return NextResponse.redirect(new URL('/auth?next=' + url.pathname, request.url))
        }
        return response;
    }
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
