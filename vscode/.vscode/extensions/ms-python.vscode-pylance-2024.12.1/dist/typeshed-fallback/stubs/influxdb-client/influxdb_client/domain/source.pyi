from _typeshed import Incomplete

class Source:
    openapi_types: Incomplete
    attribute_map: Incomplete
    discriminator: Incomplete
    def __init__(
        self,
        links: Incomplete | None = None,
        id: Incomplete | None = None,
        org_id: Incomplete | None = None,
        default: Incomplete | None = None,
        name: Incomplete | None = None,
        type: Incomplete | None = None,
        url: Incomplete | None = None,
        insecure_skip_verify: Incomplete | None = None,
        telegraf: Incomplete | None = None,
        token: Incomplete | None = None,
        username: Incomplete | None = None,
        password: Incomplete | None = None,
        shared_secret: Incomplete | None = None,
        meta_url: Incomplete | None = None,
        default_rp: Incomplete | None = None,
        languages: Incomplete | None = None,
    ) -> None: ...
    @property
    def links(self): ...
    @links.setter
    def links(self, links) -> None: ...
    @property
    def id(self): ...
    @id.setter
    def id(self, id) -> None: ...
    @property
    def org_id(self): ...
    @org_id.setter
    def org_id(self, org_id) -> None: ...
    @property
    def default(self): ...
    @default.setter
    def default(self, default) -> None: ...
    @property
    def name(self): ...
    @name.setter
    def name(self, name) -> None: ...
    @property
    def type(self): ...
    @type.setter
    def type(self, type) -> None: ...
    @property
    def url(self): ...
    @url.setter
    def url(self, url) -> None: ...
    @property
    def insecure_skip_verify(self): ...
    @insecure_skip_verify.setter
    def insecure_skip_verify(self, insecure_skip_verify) -> None: ...
    @property
    def telegraf(self): ...
    @telegraf.setter
    def telegraf(self, telegraf) -> None: ...
    @property
    def token(self): ...
    @token.setter
    def token(self, token) -> None: ...
    @property
    def username(self): ...
    @username.setter
    def username(self, username) -> None: ...
    @property
    def password(self): ...
    @password.setter
    def password(self, password) -> None: ...
    @property
    def shared_secret(self): ...
    @shared_secret.setter
    def shared_secret(self, shared_secret) -> None: ...
    @property
    def meta_url(self): ...
    @meta_url.setter
    def meta_url(self, meta_url) -> None: ...
    @property
    def default_rp(self): ...
    @default_rp.setter
    def default_rp(self, default_rp) -> None: ...
    @property
    def languages(self): ...
    @languages.setter
    def languages(self, languages) -> None: ...
    def to_dict(self): ...
    def to_str(self): ...
    def __eq__(self, other): ...
    def __ne__(self, other): ...
