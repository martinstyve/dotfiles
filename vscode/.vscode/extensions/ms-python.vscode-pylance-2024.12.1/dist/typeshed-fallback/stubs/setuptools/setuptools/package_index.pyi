import configparser
import urllib.request
from _typeshed import Incomplete
from hashlib import _Hash
from re import Pattern
from typing import ClassVar
from typing_extensions import NamedTuple

from pkg_resources import Environment

__all__ = ["PackageIndex", "distros_for_url", "parse_bdist_wininst", "interpret_distro_name"]

def parse_bdist_wininst(name): ...
def distros_for_url(url, metadata: Incomplete | None = None) -> None: ...
def interpret_distro_name(
    location, basename, metadata, py_version: Incomplete | None = None, precedence=1, platform: Incomplete | None = None
) -> None: ...

class ContentChecker:
    def feed(self, block) -> None: ...
    def is_valid(self): ...
    def report(self, reporter, template) -> None: ...

class HashChecker(ContentChecker):
    pattern: ClassVar[Pattern[str]]
    hash_name: Incomplete
    hash: _Hash
    expected: Incomplete
    def __init__(self, hash_name, expected) -> None: ...
    @classmethod
    def from_url(cls, url): ...
    def feed(self, block) -> None: ...
    def is_valid(self): ...
    def report(self, reporter, template): ...

class PackageIndex(Environment):
    index_url: str
    scanned_urls: dict[Incomplete, Incomplete]
    fetched_urls: dict[Incomplete, Incomplete]
    package_pages: dict[Incomplete, Incomplete]
    allows: Incomplete
    to_scan: list[Incomplete]
    opener = urllib.request.urlopen
    def __init__(
        self,
        index_url: str = "https://pypi.org/simple/",
        hosts=("*",),
        ca_bundle: Incomplete | None = None,
        verify_ssl: bool = True,
        *args,
        **kw,
    ) -> None: ...
    def process_url(self, url, retrieve: bool = False) -> None: ...
    def process_filename(self, fn, nested: bool = False) -> None: ...
    def url_ok(self, url, fatal: bool = False): ...
    def scan_egg_links(self, search_path) -> None: ...
    def scan_egg_link(self, path, entry) -> None: ...
    def process_index(self, url, page): ...
    def need_version_info(self, url) -> None: ...
    def scan_all(self, msg: Incomplete | None = None, *args) -> None: ...
    def find_packages(self, requirement) -> None: ...
    def obtain(self, requirement, installer: Incomplete | None = None): ...
    def check_hash(self, checker, filename, tfp) -> None: ...
    def add_find_links(self, urls) -> None: ...
    def prescan(self) -> None: ...
    def not_found_in_index(self, requirement) -> None: ...
    def download(self, spec, tmpdir): ...
    def fetch_distribution(
        self,
        requirement,
        tmpdir,
        force_scan: bool = False,
        source: bool = False,
        develop_ok: bool = False,
        local_index: Incomplete | None = None,
    ): ...
    def fetch(self, requirement, tmpdir, force_scan: bool = False, source: bool = False): ...
    def gen_setup(self, filename, fragment, tmpdir): ...
    dl_blocksize: int
    def reporthook(self, url, filename, blocknum, blksize, size) -> None: ...
    def open_url(self, url, warning: Incomplete | None = None): ...
    def scan_url(self, url) -> None: ...
    def debug(self, msg, *args) -> None: ...
    def info(self, msg, *args) -> None: ...
    def warn(self, msg, *args) -> None: ...

class Credential(NamedTuple):
    username: str
    password: str

class PyPIConfig(configparser.RawConfigParser):
    def __init__(self) -> None: ...
    @property
    def creds_by_repository(self): ...
    def find_credential(self, url): ...
