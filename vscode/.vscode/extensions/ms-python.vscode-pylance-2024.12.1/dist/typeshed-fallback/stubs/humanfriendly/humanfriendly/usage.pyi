USAGE_MARKER: str

def format_usage(usage_text): ...
def find_meta_variables(usage_text): ...
def parse_usage(text): ...
def render_usage(text): ...
def inject_usage(module_name) -> None: ...
