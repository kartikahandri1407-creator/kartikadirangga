import { IS_ADMIN } from '../admin';
import React from 'react';
import { ProjectItem } from '../data/portfolioData';
import { ProjectVisualPreview } from './ProjectVisualPreview';
import { ArrowUpRight, ExternalLink, Sliders } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectItem;
  index?: number;
  onSelectProject: (project: ProjectItem) => void;
  onEditProject: (project: ProjectItem) => void;
}

export const isValidHttpUrl = (value: string): boolean => {
  if (!value || !value.trim()) return false;
  try {
    const url = new URL(value.trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index = 0,
  onSelectProject,
  onEditProject,
}) => {
  const hasValidDemo = isValidHttpUrl(project.demoUrl);

  return (
    <article className="group flex flex-col justify-between rounded-2xl bg-white border border-stone-200/85 p-5 sm:p-6 transition-all duration-200 hover:border-[#FF5500]/70">
      <div>
        {/* Visual Showcase Container */}
        <div
          onClick={() => onSelectProject(project)}
          className="cursor-pointer mb-5"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectProject(project);
            }
          }}
        >
          <ProjectVisualPreview project={project} size="card" />
        </div>

        {/* Clean Unboxed Metadata Line (Zero-Pill Discipline) */}
        <div className="flex items-center justify-between gap-2 text-xs text-stone-500 mb-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono-tabular font-bold text-[#FF5500]">
              0{index + 1}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-stone-700">
              {project.category}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-[#141413]">
              {project.status}
            </span>
          </div>

          {IS_ADMIN && (
<button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEditProject(project);
            }}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-400 hover:text-[#FF5500] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            title={`Kelola data proyek ${project.name}`}
          >
            <Sliders className="w-3 h-3" />
            <span>Edit</span>
          </button>
)}
        </div>

        {/* Project Title & Summary */}
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-[#141413] tracking-tight font-display">
            <button
              type="button"
              onClick={() => onSelectProject(project)}
              className="text-left group-hover:text-[#FF5500] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF5500]"
            >
              {project.name}
            </button>
          </h3>

          <p className="text-sm text-stone-600 leading-relaxed line-clamp-3 text-justify">
            {project.summary}
          </p>
        </div>
      </div>

      {/* Action Footer with Direct Live App Link & Case Study Button */}
      <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onSelectProject(project)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#141413] hover:text-[#FF5500] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>Baca Studi Kasus</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>

        {hasValidDemo ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FF5500] text-white text-xs font-semibold hover:bg-[#E04800] transition-colors whitespace-nowrap shrink-0"
          >
            <span>
              {project.status === 'In Development'
                ? 'Lihat Progres Prototipe'
                : 'Coba Prototipe'}
            </span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <span className="text-[11px] font-mono-tabular text-stone-400">
            Studi Kasus · {project.lastUpdated}
          </span>
        )}
      </div>
    </article>
  );
};
