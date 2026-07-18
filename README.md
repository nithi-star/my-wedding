# Nithisha & Antony Vivek — Wedding Invitation

An elegant, premium digital wedding invitation built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. 

Guests land on a beautifully animated, centered invitation card featuring custom gold styling and a beating heart seal. Tapping "Open Invitation" triggers an organic transition: the card slides away, romantic background music begins, and the guest enters the main invitation containing a countdown, ceremony schedule, scripture verse, and an interactive Guest Wishes board.

---

## Features

- ** Wax Heart Greeting Card**: Centered envelope card with a beating gold heart badge that unlocks the site and starts the ambient music.
- **Dynamic Guest Greeting**: Reads `?to=GuestName` or `?name=GuestName` from the URL client-side to greet each guest personally (e.g., `?to=Klaus`). Falls back to "Family & Friends".
- **Ambient Music Player**: Soft background music controls that fade in smoothly upon unlocking.
- **Drifting Canvas Particles**: A canvas background rendering falling rose petals and gold flakes that drifts gracefully behind the content.
- **Sparkle Overlays**: A light, interactive cursor sparkle effect that scatters golden stars on click or tap.
- **Countdown Timer**: A live countdown clock counting down the days, hours, minutes, and seconds to the ceremony.
- **Global Guest Book (Wishes)**: A fully functional Guest Book board allowing guests to submit congratulations and blessings. Supports local browser cache fallback and live cloud synchronization.

---

## Getting Started

### Local Development

1. Install project dependencies:
   ```bash
   npm install
   ```

2. Start the local Next.js development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) (or `http://localhost:3000/?to=Klaus` to test guest naming).

---

## Configuration

Everything you need to edit day-to-day text content lives in one file: **[lib/config.ts](file:///c:/Users/nithi/Downloads/wedding-invite/wedding-invite/lib/config.ts)**. 
Open this file to customize:
*   Bride & Groom names
*   Parents' names
*   Event dates and display strings
*   Schedule times, venues, Google Maps links, and notes
*   Bible verse quotes and references

---

## Connecting the Database (Supabase)

The Guest Book board works out of the box locally using `localStorage`. For production deployment, you can connect a free-tier **Supabase** database so wishes are shared globally:

1. Create a free account at [Supabase](https://supabase.com) and start a new project.
2. In the **SQL Editor**, click **New Query**, paste the following script, and click **Run** to set up the database table and security permissions:
   ```sql
   create table public.wishes (
     id bigint generated always as identity primary key,
     name text not null,
     message text not null,
     created_at timestamp with time zone default now() not null
   );

   alter table public.wishes enable row level security;

   create policy "Allow public read access" on public.wishes for select using (true);
   create policy "Allow public insert access" on public.wishes for insert with check (true);
   ```
3. Copy your project's **URL** and **Anon Key** from Settings -> API.
4. Set them as environment variables on Vercel:
   *   `NEXT_PUBLIC_SUPABASE_URL`
   *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Deploying

The fastest deployment path is [Vercel](https://vercel.com/new). Simply connect your GitHub repository, configure your two Supabase environment variables, and it will deploy automatically.
