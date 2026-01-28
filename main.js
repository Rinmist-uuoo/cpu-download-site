const BASE_PATH = 'files';

async function listDir(path = '') {
  const apiUrl = `https://api.github.com/repos/Rinmist-uuoo/cpu-download-site/contents/${BASE_PATH}/${path}`;

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

    if (item.type === 'dir') {
      li.innerHTML = `📁 <a href="?path=${path}/${item.name}">${item.name}</a>`;
    } else {
      li.innerHTML = `📄 <a href="${item.download_url}">${item.name}</a>`;
    }

    ul.appendChild(li);
  });
}

function renderBreadcrumb(path) {
  const div = document.getElementById('breadcrumb');
  const parts = path.split('/').filter(Boolean);

  let current = '';
  div.innerHTML = `<a href="?">根目录</a>`;

  parts.forEach(p => {
    current += '/' + p;
    div.innerHTML += ` / <a href="?path=${current.slice(1)}">${p}</a>`;
  });
}

const params = new URLSearchParams(location.search);
const path = params.get('path') || '';
listDir(path);
