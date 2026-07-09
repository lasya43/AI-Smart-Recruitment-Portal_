
CREATE POLICY "Users read own resumes" ON storage.objects FOR SELECT TO authenticated USING (bucket_id='resumes' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users upload own resumes" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id='resumes' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users update own resumes" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id='resumes' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users delete own resumes" ON storage.objects FOR DELETE TO authenticated USING (bucket_id='resumes' AND auth.uid()::text = (storage.foldername(name))[1]);
