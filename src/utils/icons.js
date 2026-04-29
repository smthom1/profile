export const getIcon = (id, theme) => {
  const is11 = theme === 'win11';
  const prefix = is11 ? 'w11' : 'w98';
  const folder = is11 ? 'icons11' : 'icons98';

  // Add a cache buster parameter to force the browser to reload the image if it's currently caching a blank state or 404
  const v = '?v=3';
  switch (id) {
    case 'comp': return `${folder}/${prefix}_computer.ico${v}`;
    case 'projects': return `${folder}/projects_icon.ico${v}`;
    case 'skills': return `${folder}/${prefix}_tools_gear.ico${v}`;
    case 'resume': return `${folder}/resume_icon.ico${v}`;
    case 'about': return `${folder}/about_me_icon.ico${v}`;
    case 'recycle': return `${folder}/${prefix}_recycle_bin_full.ico${v}`;
    case 'github': return 'images/pixel-github.png' + v;
    case 'linkedin': return 'images/pixel-linkedin.png' + v;
    case 'minesweeper': return `${folder}/${prefix}_game_mine_2.ico${v}`;
    case 'notepad': return `${folder}/${prefix}_notepad.ico${v}`;
    case 'shutdown': return `${folder}/${prefix}_shut_down_normal.ico${v}`;
    case 'start': return `${folder}/${prefix}_windows.ico${v}`;
    default: return '';
  }
};
