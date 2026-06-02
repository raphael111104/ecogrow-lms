import { Camera, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

type MockUploadBoxProps = {
  previewUrl?: string;
  title?: string;
  description?: string;
  className?: string;
};

export function MockUploadBox({
  previewUrl,
  title = "Pilih foto bukti",
  description = "Foto pilihanmu akan tampil di sini sebelum dikirim.",
  className,
}: MockUploadBoxProps) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-dashed border-leaf-500/35 bg-leaf-50", className)}>
      {previewUrl ? (
        <div className="grid aspect-[16/9] place-items-center bg-white">
          <img src={previewUrl} alt={title} className="h-full w-full object-contain p-4" />
        </div>
      ) : (
        <div className="grid aspect-[16/9] place-items-center p-6 text-center">
          <div>
            <span className="mx-auto grid size-12 place-items-center rounded-xl bg-white text-leaf-700 shadow-soft">
              <UploadCloud className="size-6" aria-hidden="true" />
            </span>
            <p className="mt-3 font-heading text-xl font-black text-leaf-700">{title}</p>
            <p className="mt-1 text-sm font-semibold leading-6 text-mutedText">{description}</p>
          </div>
        </div>
      )}
      <div className="flex items-center gap-2 border-t border-leaf-500/10 bg-white/70 px-4 py-3 text-xs font-black uppercase tracking-wide text-leaf-700">
        <Camera className="size-4" aria-hidden="true" />
        Pratinjau gambar
      </div>
    </div>
  );
}
