const BASE_PATH = 'files';
const OWNER = 'Rinmist-uuoo';
const REPO = 'cpu-download-site';

async function listDir(path = '') {
  const apiUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${BASE_PATH}/${path}`;
  const res = await fetch(apiUrl);
  const data = await res.json();

  renderBreadcrumb(path);
  renderList(data, path);
}

function renderList(items, path) {
  const ul = document.getElementById('file-list');
  ul.innerHTML = '';

  items.forEach(item => {
    const li = document.createElement('li');
    li.className = 'file-item';

    const icon = document.createElement('div');
    icon.className = 'file-icon';
    icon.textContent = item.type === 'dir' ? '📁' : '📄';

    const name = document.createElement('div');
    name.className = 'file-name';

    if (item.type === 'dir') {
      name.innerHTML = `<a href="?path=${encodeURIComponent(
        path ? path + '/' + item.name : item.name
      )}">${item.name}</a>`;
    } else {
      name.innerHTML = `<a href="${item.download_url}">${item.name}</a>`;
    }

    const type = document.createElement('div');
    type.className = 'file-type';
    type.textContent = item.type === 'dir' ? '文件夹' : '文件';

    li.appendChild(icon);
    li.appendChild(name);
    li.appendChild(type);
    ul.appendChild(li);
  });
}

function renderBreadcrumb(path) {
  const div = document.getElementById('breadcrumb');
  const parts = path.split('/').filter(Boolean);

  let html = `<a href="?">根目录</a>`;
  let current = '';

  parts.forEach(p => {
    current += (current ? '/' : '') + p;
    html += ` / <a href="?path=${encodeURIComponent(current)}">${p}</a>`;
  });

  div.innerHTML = html;
}

const params = new URLSearchParams(location.search);
const path = params.get('path') || '';
listDir(path);
